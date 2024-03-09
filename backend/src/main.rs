extern crate log;

use actix_web::{
    middleware::{self},
    web, App, HttpResponse, HttpServer, Result};
use actix_cors::Cors;
use diesel::{r2d2::{self, ConnectionManager}, PgConnection};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use listenfd::ListenFd;
use serde::Serialize;
use std::env;

// type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub mod repository;
pub mod models;
pub mod controllers;
pub mod routes;

pub type DatabaseConnection = PgConnection;
pub type Pool = r2d2::Pool<ConnectionManager<DatabaseConnection>>;

#[derive(Serialize)]
pub struct Response {
    pub message: String,
}

async fn not_found() -> Result<HttpResponse> {
    let response = Response {
        message: "Resource not found".to_string(),
    };
    Ok(HttpResponse::NotFound().json(response))
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();
    let mut listenfd = ListenFd::from_env();

    let db = repository::database::Database::new();
    let data = web::Data::new(db);

    let mut server = HttpServer::new(move || {
        App::new()
            .app_data(data.clone())
            .wrap(middleware::Logger::default())
            .wrap(
                Cors::default()
                    .allowed_origin(env::var("CORS_ORIGIN")
                        .unwrap_or_else(|_| "http://localhost:3000".to_string()).as_str())
                    .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
                    .allowed_header(actix_web::http::header::CONTENT_TYPE)
                    .max_age(3600)
                )
            .default_service(web::route().to(not_found))
            .configure(routes::index_router::index_config)
            .configure(routes::network_router::network_config)
            .configure(routes::entry_router::entry_config)
    });

    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => {
            let host = env::var("HOST").expect("Host not set");
            let port = env::var("PORT").expect("Port not set");
            server.bind(format!("{}:{}", host, port))?
        }
    };
    server.run().await
}
