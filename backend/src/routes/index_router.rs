use crate::controllers::index_controller::{greet};
use actix_web::web;

pub fn index_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/")
            .service(greet)
    );
}
