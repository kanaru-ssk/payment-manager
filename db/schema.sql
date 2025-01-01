SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: prevent_created_at_update_and_update_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.prevent_created_at_update_and_update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- created_at の更新を防ぐ
    NEW.created_at = OLD.created_at;
    IF OLD.created_at != NEW.created_at THEN
        RAISE EXCEPTION 'cannot update created_at column';
    END IF;

    -- updated_at を現在のタイムスタンプに更新
    NEW.updated_at = current_timestamp;

    RETURN NEW;
END;
$$;


--
-- Name: prevent_user_id_update(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.prevent_user_id_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- user_id の更新を防ぐ
    NEW.user_id = OLD.user_id;
    IF OLD.user_id != NEW.user_id THEN
        RAISE EXCEPTION 'cannot update user_id column';
    END IF;

    RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: colors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.colors (
    color_id uuid DEFAULT gen_random_uuid() NOT NULL,
    color_code character varying(7) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT color_code_check CHECK (((color_code)::text ~ '^#[0-9A-Fa-f]{6}$'::text))
);


--
-- Name: payment_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_categories (
    payment_category_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    color_id uuid NOT NULL,
    payment_category_name character varying(64) NOT NULL,
    is_needs boolean NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    payment_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    payment_category_id uuid NOT NULL,
    payment_target character varying(64) NOT NULL,
    payment_amount integer NOT NULL,
    satisfaction_level integer DEFAULT 0 NOT NULL,
    paid_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT payment_amount_check CHECK ((payment_amount >= 0)),
    CONSTRAINT satisfaction_level_check CHECK ((satisfaction_level = ANY (ARRAY['-1'::integer, 0, 1])))
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_name character varying(64) NOT NULL,
    email character varying(256) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT email_check CHECK (((email)::text ~ '^[a-zA-Z0-9](\.?[a-zA-Z0-9_-])*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'::text))
);


--
-- Name: colors colors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.colors
    ADD CONSTRAINT colors_pkey PRIMARY KEY (color_id);


--
-- Name: payment_categories payment_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_categories
    ADD CONSTRAINT payment_categories_pkey PRIMARY KEY (payment_category_id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (payment_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_payments_paid_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_paid_at ON public.payments USING btree (paid_at);


--
-- Name: idx_payments_payment_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_payment_category_id ON public.payments USING btree (payment_category_id);


--
-- Name: idx_payments_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_payments_user_id ON public.payments USING btree (user_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: colors prevent_created_at_update_and_update_updated_at_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE UPDATE ON public.colors FOR EACH ROW EXECUTE FUNCTION public.prevent_created_at_update_and_update_updated_at();


--
-- Name: payment_categories prevent_created_at_update_and_update_updated_at_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE UPDATE ON public.payment_categories FOR EACH ROW EXECUTE FUNCTION public.prevent_created_at_update_and_update_updated_at();


--
-- Name: payments prevent_created_at_update_and_update_updated_at_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.prevent_created_at_update_and_update_updated_at();


--
-- Name: users prevent_created_at_update_and_update_updated_at_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_created_at_update_and_update_updated_at_before_update BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.prevent_created_at_update_and_update_updated_at();


--
-- Name: payment_categories prevent_user_id_update_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_user_id_update_before_update BEFORE UPDATE ON public.payment_categories FOR EACH ROW EXECUTE FUNCTION public.prevent_user_id_update();


--
-- Name: payments prevent_user_id_update_before_update; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER prevent_user_id_update_before_update BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.prevent_user_id_update();


--
-- Name: payment_categories payment_categories_color_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_categories
    ADD CONSTRAINT payment_categories_color_id_fkey FOREIGN KEY (color_id) REFERENCES public.colors(color_id) ON DELETE RESTRICT;


--
-- Name: payment_categories payment_categories_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_categories
    ADD CONSTRAINT payment_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: payments payments_payment_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_payment_category_id_fkey FOREIGN KEY (payment_category_id) REFERENCES public.payment_categories(payment_category_id) ON DELETE RESTRICT;


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20241222221600'),
    ('20241222224807'),
    ('20241222224843'),
    ('20241222224947'),
    ('20241222225217'),
    ('20241222230204');
