use crate::controllers::entry_controller::{create_entry, delete_entry, get_entries, update_entry};
use actix_web::web::{self, delete};

pub fn entry_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
      web::scope("/entries")
        .service(get_entries)
        .service(create_entry)
        .service(update_entry)
        .service(delete_entry)
    );

}
