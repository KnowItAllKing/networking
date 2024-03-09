use crate::controllers::network_controller::{create_network, delete_network, get_networks, update_network};
use actix_web::web;

pub fn network_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
      web::scope("/network")
        .service(get_networks)
        .service(create_network)
        .service(update_network)
        .service(delete_network)
    );

}
