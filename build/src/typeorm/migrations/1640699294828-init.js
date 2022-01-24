"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1640699294828 = void 0;
class init1640699294828 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE SCHEMA users;

    CREATE TABLE users.users
    (
        id        serial,
        name      varchar,
        surname   varchar,
        last_name varchar,
        password  varchar,
        email     varchar                 NOT NULL,
        created   timestamp default now() NOT NULL,
        updated   timestamp default NULL,
        constraint c_users_users_pk primary key (id)
    );
    
    CREATE TABLE users.sessions
    (
        id      serial,
        created timestamp default now() NOT NULL,
        user_id int                     NOT NULL,
        agent   varchar                 NOT NULL,
        address inet,
        constraint c_users_sessions_pk primary key (id),
        constraint c_users_sessions_user_id_fk foreign key (user_id) references users.users (id) on delete cascade
    );
    
    CREATE TABLE todos
    (
        id      serial,
        user_id int                     NOT NULL,
        name    varchar,
        created timestamp default now() NOT NULL,
        updated timestamp default now() NOT NULL,
        constraint c_todos_pk primary key (id),
        constraint c_todos_user_id_fk foreign key (user_id) references users.users (id) on delete cascade
    );
    
    
    
    CREATE TABLE tasks
    (
        id      serial,
        todo_id int                     NOT NULL,
        name    varchar,
        created timestamp default now() NOT NULL,
        updated timestamp default NULL,
        constraint c_tasks_pk primary key (id),
        constraint c_tasks_todo_id_fk foreign key (todo_id) references todos (id) on delete cascade
    );
    

    CREATE TABLE filters
    ( 
        id      serial,
        name    varchar,
        created timestamp default now() NOT NULL,
        updated timestamp default NULL,
        constraint c_filters_pk primary key (id)
    );

    CREATE TABLE filters_todos
(
    id        serial NOT NULL,
    todo_id   int    NOT NULL ,
    filter_id int    NOT NULL ,
    constraint c_filters_todos_pk primary key (id),
    constraint c_filters_todos_todos_fk foreign key (todo_id) references todos (id),
    constraint c_filters_todos_filter_fk foreign key (filter_id) references filters (id),
   


);


CREATE TABLE autors
(
    id   serial  NOT NULL,
    name varchar NOT NULL,
    constraint c_autors_pk primary key (id)


);


CREATE TABLE books
(
    id   serial  NOT NULL,
    name varchar NOT NULL,
    constraint c_books_pk primary key (id)
);


CREATE TABLE books_autor
(
    id       serial NOT NULL,
    books_id int    NOT NULL,
    autor_id int    NOT NULL,
    constraint c_books_autor primary key (id),
    constraint c_books_autor_autor_fk foreign key (autor_id) references autors (id),
    constraint c_books_autor_books_fk foreign key (books_id) references books (id)
)
    
CREATE TABLE search_todos
(
    id      serial NOT NULL,
    vector  tsvector,
    todo_id int    NOT NULL,
    constraint c_search_todos_vectors primary key (id),
    constraint c_search_todos_vectors_todo_id_fk foreign key (todo_id) references todos (id) on delete cascade
);
CREATE INDEX vector_idx on search_todos_vectors USING gin (vector);

-- функция которая будет срабатывать при добавлении todo
CREATE Or REPLACE FUNCTION create_todo_search_vector()
    RETURNS trigger AS
$$
BEGIN
    Insert INTO search_todos_vectors(vector) VALUES (to_tsvector(new.name));
    Return new;
end;
$$
    Language 'plpgsql';

-- тригер  который будет срабатывать при добавлении todo
CREATE TRIGGER after_insert_todo
    AFTER INSERT
    on todos
    FOR EACH ROW
EXECUTE PROCEDURE create_todo_search_vector();

CREATE TABLE search_todos
(
    id      serial NOT NULL,
    vector  tsvector,
    todo_id int    NOT NULL,
    constraint c_search_todos_pk primary key (id),
    constraint c_search_todos_todo_id_fk foreign key (todo_id) references todos (id) on delete cascade,
    constraint c_search_todos_todo_id_uq unique (todo_id)
);
CREATE INDEX vector_idx on search_todos USING gin (vector);



`);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async down(queryRunner) { }
}
exports.init1640699294828 = init1640699294828;
