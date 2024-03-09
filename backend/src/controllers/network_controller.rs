use actix_web::{delete, get, post, put, web::{self, delete}, HttpRequest, HttpResponse};
use serde::Deserialize;

use crate::repository::database::Database;

#[get("")]
pub async fn get_networks(db: web::Data<Database>) -> HttpResponse {
  let networks = db.get_networks().await;
  HttpResponse::Ok().json(networks)
}

#[derive(Deserialize, Debug)]
pub struct NetworkBody {
    pub name: String,
    pub company: String,
}

#[post("")]
pub async fn create_network(db: web::Data<Database>, body: web::Json<NetworkBody>) -> HttpResponse {
  let network = db.create_network(body.name.clone(), body.company.clone()).await;
  HttpResponse::Ok().json(network)
}


#[put("/{id}")]
pub async fn update_network(req: HttpRequest, db: web::Data<Database>, body: web::Json<NetworkBody>) -> HttpResponse {
  match req.match_info().get("id").and_then(|id| id.parse::<i32>().ok()) {
    Some(id) => {
      let network = db.update_network(id, body.name.clone(), body.company.clone()).await;
        HttpResponse::Ok().json(network)
    },
    None => HttpResponse::BadRequest().json("Invalid network ID"),
  }
}

#[delete("/{id}")]
pub async fn delete_network(req: HttpRequest, db: web::Data<Database>) -> HttpResponse {
  match req.match_info().get("id").and_then(|id| id.parse::<i32>().ok()) {
    Some(id) => {
      let deleted = db.delete_network(id).await;
      if deleted {
        HttpResponse::Ok().json("Network deleted")
      } else {
        HttpResponse::NotFound().json("Network not found")
      }
    },
    None => HttpResponse::BadRequest().json("Invalid network ID"),
  }
}
