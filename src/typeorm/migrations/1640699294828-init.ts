import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1640699294828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
