#[macro_use]
extern crate log;

use actix_web::{
    middleware::{self, Logger},
    web, App, HttpResponse, HttpServer, Responder,
};
// use diesel::prelude::*;
// use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use listenfd::ListenFd;
use std::env;

// type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub mod controllers;
pub mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init();
    let mut listenfd = ListenFd::from_env();

    let mut server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .configure(routes::index_router::config)
    });

    server = match listenfd.take_tcp_listener(0)? {
        Some(listener) => server.listen(listener)?,
        None => {
            let host = env::var("HOST").expect("Host not set");
            let port = env::var("PORT").expect("Port not set");
            server.bind(format!("{}:{}", host, port))?
        }
    };

    info!("Starting server");
    server.run().await
}