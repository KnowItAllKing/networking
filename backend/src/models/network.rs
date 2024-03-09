use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable, AsChangeset};

#[derive(Serialize, Deserialize, Debug, Clone, Queryable, AsChangeset)]
#[diesel(table_name = crate::repository::schema::network)]
pub struct Network {
    #[serde(default)]
    pub id: i32,
    pub name: Option<String>,
    pub company: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Insertable)]
#[diesel(table_name= crate::repository::schema::network)]
pub struct NewNetwork {
    pub name: Option<String>,
    pub company: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}