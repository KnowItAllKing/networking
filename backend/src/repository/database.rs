use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use diesel::PgConnection;
use dotenv::dotenv; 
use diesel::RunQueryDsl;


use crate::models::network::{Network, NewNetwork};
use crate::models::entry::{Entry, NewEntry};

use crate::repository::schema::network::dsl::{network, name as network_name};
use crate::repository::schema::entries::dsl::{entries, name as entry_name};

pub type DBPool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub struct Database {
  pool: DBPool,
}
impl Database {
  pub fn new() -> Self {
    dotenv().ok();
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: DBPool = r2d2::Pool::builder()
      .build(manager)
      .expect("Failed to create pool.");
    Database { pool }
  }
  pub async fn get_networks(&self) -> Vec<Network> {
    network.load::<Network>( &mut self.pool.get().unwrap()).expect("Error loading networks")
  }

  pub async fn create_network(&self, _name: String, _company: String) -> Network {
    let new_network = NewNetwork {
      name: Some(_name),
      company: Some(_company),
      created_at: chrono::Local::now().naive_local(),
      updated_at: chrono::Local::now().naive_local(),
    };
    diesel::insert_into(network)
      .values(&new_network)
      .get_result(&mut self.pool.get().unwrap())
      .expect("Error saving new network")
  }

  pub async fn update_entry_names(&self, old_name: String, new_name: String) -> Result<usize, diesel::result::Error> {
    let result: Result<usize, diesel::result::Error> = diesel::update(entries.filter(entry_name.eq(old_name)))
        .set(entry_name.eq(new_name))
        .execute(&mut *self.pool.get().unwrap());

    result
  }

  pub async fn update_network(&self, _id: i32, _name: String, _company: String) -> Network {
    let doc = network.find(_id).first::<Network>(&mut self.pool.get().unwrap()).expect("Error loading network");
    let updated_network = Network {
      id: doc.id,
      name: Some(_name.clone()), // Clone the value to pass it to update_entry_names
      company: Some(_company),
      created_at: chrono::Local::now().naive_local(),
      updated_at: chrono::Local::now().naive_local(),
    };
    self.update_entry_names(doc.name.unwrap(), _name).await.expect("Error updating entry names"); 
    diesel::update(network.find(_id))
      .set(&updated_network)
      .get_result(&mut self.pool.get().unwrap())
      .expect("Error updating network")
  }

  pub async fn delete_network(&self, _id: i32) -> bool {
    diesel::delete(network.find(_id))
      .execute(&mut self.pool.get().unwrap())
      .is_ok()
  }

  pub async fn get_entries(&self) -> Vec<Entry> {
    entries.load::<Entry>( &mut self.pool.get().unwrap()).expect("Error loading entries")
  }

  pub async fn create_entry(&self, _title: String, _body: String, _name: String) -> Entry {
    let new_entry = NewEntry {
      title: Some(_title),
      body: Some(_body),
      created_at: chrono::Local::now().naive_local(),
      updated_at: chrono::Local::now().naive_local(),
      name: _name,
    };
    diesel::insert_into(entries)
      .values(&new_entry)
      .get_result(&mut self.pool.get().unwrap())
      .expect("Error saving new entry")
  }

  pub async fn update_entry(&self, _id: i32, _title: String, _body: String, _name: String) -> Entry {
    let doc = entries.find(_id).first::<Entry>(&mut self.pool.get().unwrap()).expect("Error loading entry");
    let updated_entry = Entry {
      id: doc.id,
      title: Some(_title),
      body: Some(_body),
      created_at: chrono::Local::now().naive_local(),
      updated_at: chrono::Local::now().naive_local(),
      name: _name,
    };
    diesel::update(entries.find(_id))
      .set(&updated_entry)
      .get_result(&mut self.pool.get().unwrap())
      .expect("Error updating entry")
  }

  pub async fn delete_entry(&self, _id: i32) -> bool {
    diesel::delete(entries.find(_id))
      .execute(&mut self.pool.get().unwrap())
      .is_ok()
  }
}
