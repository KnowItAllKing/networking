use actix_web::{get, HttpResponse};

#[get("")]
pub async fn greet() -> HttpResponse {
    HttpResponse::Ok().json("Hello World!")
}
