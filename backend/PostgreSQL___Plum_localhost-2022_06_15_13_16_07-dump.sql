--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Plum; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Plum" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Europe.1252';


ALTER DATABASE "Plum" OWNER TO postgres;

\connect "Plum"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: membership; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.membership AS ENUM (
    'member',
    'official_member',
    'admin',
    'verified_member'
);


ALTER TYPE public.membership OWNER TO postgres;

--
-- Name: poll_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.poll_type AS ENUM (
    'unofficial',
    'official'
);


ALTER TYPE public.poll_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: poll_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.poll_options (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    poll_id integer NOT NULL,
    vote_count integer DEFAULT 0
);


ALTER TABLE public.poll_options OWNER TO postgres;

--
-- Name: poll_options_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.poll_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poll_options_id_seq OWNER TO postgres;

--
-- Name: poll_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.poll_options_id_seq OWNED BY public.poll_options.id;


--
-- Name: polls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.polls (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255),
    author_id integer NOT NULL
);


ALTER TABLE public.polls OWNER TO postgres;

--
-- Name: polls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.polls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.polls_id_seq OWNER TO postgres;

--
-- Name: polls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.polls_id_seq OWNED BY public.polls.id;


--
-- Name: relationship_polls_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relationship_polls_users (
    poll_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.relationship_polls_users OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    day_joined date DEFAULT CURRENT_DATE NOT NULL,
    vote_counter integer DEFAULT 0 NOT NULL,
    membership public.membership DEFAULT 'member'::public.membership NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id integer NOT NULL,
    poll_id integer NOT NULL
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.votes_id_seq OWNER TO postgres;

--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;


--
-- Name: poll_options id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_options ALTER COLUMN id SET DEFAULT nextval('public.poll_options_id_seq'::regclass);


--
-- Name: polls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls ALTER COLUMN id SET DEFAULT nextval('public.polls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: votes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);


--
-- Data for Name: poll_options; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: polls; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.polls (id, title, description, author_id) VALUES (1, 'What bread do you prefer?', 'What bread should we get for the festivities?', 4);
INSERT INTO public.polls (id, title, description, author_id) VALUES (2, 'Second test poll.', 'Is this the best poll app ever?', 3);
INSERT INTO public.polls (id, title, description, author_id) VALUES (3, 'Third test.', 'My god this is a good test.', 1);


--
-- Data for Name: relationship_polls_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.relationship_polls_users (poll_id, user_id) VALUES (1, 1);
INSERT INTO public.relationship_polls_users (poll_id, user_id) VALUES (2, 4);
INSERT INTO public.relationship_polls_users (poll_id, user_id) VALUES (3, 4);
INSERT INTO public.relationship_polls_users (poll_id, user_id) VALUES (1, 4);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, username, password, email, day_joined, vote_counter, membership) VALUES (1, 'testUsername', 'testPassword', 'test.email@email.com', '2022-03-06', 0, 'member');
INSERT INTO public.users (id, username, password, email, day_joined, vote_counter, membership) VALUES (3, 'OhMyTest', 'asd', 'anotherTest@test.com', '2022-03-06', 0, 'member');
INSERT INTO public.users (id, username, password, email, day_joined, vote_counter, membership) VALUES (4, 'test', 'test', 'test@test.com', '2022-03-07', 0, 'member');


--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.votes (id, poll_id) VALUES (3, 1);


--
-- Name: poll_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.poll_options_id_seq', 1, false);


--
-- Name: polls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.polls_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.votes_id_seq', 1, false);


--
-- Name: poll_options poll_options_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.poll_options
    ADD CONSTRAINT poll_options_pk PRIMARY KEY (id);


--
-- Name: polls polls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls
    ADD CONSTRAINT polls_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: votes votes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pk PRIMARY KEY (id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_uindex ON public.users USING btree (email);


--
-- Name: polls polls_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.polls
    ADD CONSTRAINT polls_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: relationship_polls_users polls_users_polls_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationship_polls_users
    ADD CONSTRAINT polls_users_polls_id_fk FOREIGN KEY (poll_id) REFERENCES public.polls(id);


--
-- Name: relationship_polls_users polls_users_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relationship_polls_users
    ADD CONSTRAINT polls_users_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: votes votes_polls_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_polls_id_fk FOREIGN KEY (poll_id) REFERENCES public.polls(id);


--
-- PostgreSQL database dump complete
--

