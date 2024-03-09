use actix_web::{delete, get, post, put, web, HttpRequest, HttpResponse};
use serde::Deserialize;

use crate::repository::database::Database;

#[get("")]
pub async fn get_entries(db: web::Data<Database>) -> HttpResponse {
  let _entries = db.get_entries().await;
  HttpResponse::Ok().json(_entries)
}

#[derive(Deserialize, Debug)]
pub struct EntryBody {
    pub title: String,
    pub body: String,
    pub name: String
}

#[post("")]
pub async fn create_entry(db: web::Data<Database>, body: web::Json<EntryBody>) -> HttpResponse {
  let entry = db.create_entry(body.title.clone(), body.body.clone(), body.name.clone()).await;
  HttpResponse::Ok().json(entry)
}


#[put("/{id}")]
pub async fn update_entry(req: HttpRequest, db: web::Data<Database>, body: web::Json<EntryBody>) -> HttpResponse {
  match req.match_info().get("id").unwrap().parse::<i32>() {
    Ok(id) => {
        let entry = db.update_entry(id, body.title.clone(), body.body.clone(), body.name.clone()).await;
        HttpResponse::Ok().json(entry)
    },
    Err(_) => HttpResponse::BadRequest().json("Invalid ID format"),
}
}

#[delete("/{id}")]
pub async fn delete_entry(req: HttpRequest, db: web::Data<Database>) -> HttpResponse {
    match req.match_info().get("id").unwrap().parse::<i32>() {
        Ok(id) => {
            let deleted = db.delete_entry(id).await;
            if deleted {
                HttpResponse::Ok().json("Entry deleted")
            } else {
                HttpResponse::NotFound().json("Entry not found")
            }
        },
        Err(_) => HttpResponse::BadRequest().json("Invalid ID format"),
    }
}