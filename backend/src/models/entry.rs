use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable, AsChangeset};

#[derive(Serialize, Deserialize, Debug, Clone, Queryable, Insertable, AsChangeset)]
#[diesel(table_name = crate::repository::schema::entries)]
pub struct Entry {
    #[serde(default)]
    pub id: i32,
    pub title: Option<String>,
    pub body: Option<String>,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
    pub name: String,

}
#[derive(Insertable)]
#[diesel(table_name = crate::repository::schema::entries)]
pub struct NewEntry {
    pub title: Option<String>,
    pub body: Option<String>,
    pub name: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}
