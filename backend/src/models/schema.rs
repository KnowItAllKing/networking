// @generated automatically by Diesel CLI.

diesel::table! {
    entries (id) {
        id -> Int4,
        #[max_length = 255]
        title -> Nullable<Varchar>,
        body -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
        #[max_length = 255]
        name -> Varchar,
    }
}

diesel::table! {
    network (id) {
        id -> Int4,
        #[max_length = 255]
        name -> Nullable<Varchar>,
        #[max_length = 255]
        company -> Nullable<Varchar>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    entries,
    network,
);
