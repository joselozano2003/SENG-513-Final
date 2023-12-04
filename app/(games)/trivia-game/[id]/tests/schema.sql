create table
  public."triviaGame" (
    id serial,
    state integer not null,
    "playerLimit" integer not null,
    admin text not null,
    constraint triviaGame_pkey primary key (id)
  ) tablespace pg_default;


create table
    public."triviaGamePlayer" (
    id serial,
    "gameId" integer not null,
    "userId" text not null,
    score integer not null,
    "playerNumber" integer not null,
    constraint triviaGamePlayer_pkey primary key (id),
    constraint triviaGamePlayer_gameId_fkey foreign key ("gameId") references "triviaGame" (id) on update cascade on delete restrict
) tablespace pg_default;


create table
  public."triviaQuestion" (
    id serial,
    question text not null,
    answer text not null,
    category text not null,
    constraint triviaQuestion_pkey primary key (id)
) tablespace pg_default;

create table
  public."_triviaGameTotriviaQuestion" (
    "A" integer not null,
    "B" integer not null,
    constraint _triviaGameTotriviaQuestion_A_fkey foreign key ("A") references "triviaGame" (id) on update cascade on delete cascade,
    constraint _triviaGameTotriviaQuestion_B_fkey foreign key ("B") references "triviaQuestion" (id) on update cascade on delete cascade
  ) tablespace pg_default;

create unique index "_triviaGameTotriviaQuestion_AB_unique" on public."_triviaGameTotriviaQuestion" using btree ("A", "B") tablespace pg_default;

create index if not exists "_triviaGameTotriviaQuestion_B_index" on public."_triviaGameTotriviaQuestion" using btree ("B") tablespace pg_default;


create table
    public."triviaPlayerAnswer" (
    id serial,
    "playerId" integer not null,
    "questionId" integer not null,
    "choiceId" integer not null,
    constraint triviaPlayerAnswer_pkey primary key (id),
    constraint triviaPlayerAnswer_choiceId_fkey foreign key ("choiceId") references "triviaQuestionChoice" (id) on update cascade on delete restrict,
    constraint triviaPlayerAnswer_playerId_fkey foreign key ("playerId") references "triviaGamePlayer" (id) on update cascade on delete restrict,
    constraint triviaPlayerAnswer_questionId_fkey foreign key ("questionId") references "triviaQuestion" (id) on update cascade on delete restrict
  ) tablespace pg_default;



  create table
  public."triviaQuestionChoice" (
    id serial,
    "questionId" integer not null,
    choice text not null,
    correct boolean not null,
    constraint triviaQuestionChoice_pkey primary key (id),
    constraint triviaQuestionChoice_questionId_fkey foreign key ("questionId") references "triviaQuestion" (id) on update cascade on delete restrict
  ) tablespace pg_default;