-- Table: public.Accepted_Neighborhoods

-- DROP TABLE IF EXISTS public."Accepted_Neighborhoods";

CREATE TABLE IF NOT EXISTS public."Accepted_Neighborhoods"
(
    id integer NOT NULL DEFAULT nextval('"Accepted_Neighborhoods_id_seq"'::regclass),
    neighborhood text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Accepted_Neighborhoods_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Accepted_Neighborhoods"
    OWNER to postgres;


-- Table: public.Address

-- DROP TABLE IF EXISTS public."Address";

CREATE TABLE IF NOT EXISTS public."Address"
(
    id integer NOT NULL DEFAULT nextval('"Address_id_seq"'::regclass),
    street text COLLATE pg_catalog."default" NOT NULL,
    "number" integer NOT NULL,
    "CEP" text COLLATE pg_catalog."default" NOT NULL,
    additional_info text COLLATE pg_catalog."default",
    neighborhood_id integer NOT NULL,
    CONSTRAINT "Address_pkey" PRIMARY KEY (id),
    CONSTRAINT "Accepted_neigh_id_fk" FOREIGN KEY (neighborhood_id)
        REFERENCES public."Accepted_Neighborhoods" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Address"
    OWNER to postgres;

-- Table: public.Customers

-- DROP TABLE IF EXISTS public."Customers";

CREATE TABLE IF NOT EXISTS public."Customers"
(
    id integer NOT NULL DEFAULT nextval('"Customers_id_seq"'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    address_id integer NOT NULL,
    cpf text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Customers_pkey" PRIMARY KEY (id),
    CONSTRAINT cpf_unique UNIQUE (cpf),
    CONSTRAINT "Address_id_fk" FOREIGN KEY (address_id)
        REFERENCES public."Address" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Customers"
    OWNER to postgres;

-- Table: public.Products

-- DROP TABLE IF EXISTS public."Products";

CREATE TABLE IF NOT EXISTS public."Products"
(
    id integer NOT NULL DEFAULT nextval('"Products_id_seq"'::regclass),
    price numeric(10,2) NOT NULL,
    description text COLLATE pg_catalog."default",
    image_link text COLLATE pg_catalog."default",
    CONSTRAINT "Products_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Products"
    OWNER to postgres;

-- Table: public.Combos

-- DROP TABLE IF EXISTS public."Combos";

CREATE TABLE IF NOT EXISTS public."Combos"
(
    id integer NOT NULL DEFAULT nextval('"Combos_id_seq"'::regclass),
    product_id integer,
    CONSTRAINT "Combos_pkey" PRIMARY KEY (id),
    CONSTRAINT "Combos_products_fk" FOREIGN KEY (product_id)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Combos"
    OWNER to postgres;

-- Table: public.Drinks

-- DROP TABLE IF EXISTS public."Drinks";

CREATE TABLE IF NOT EXISTS public."Drinks"
(
    id integer NOT NULL DEFAULT nextval('"Drinks_id_seq"'::regclass),
    brand text COLLATE pg_catalog."default" NOT NULL,
    "isCold" boolean,
    "isAlcoholic" boolean,
    product_id integer NOT NULL,
    CONSTRAINT "Drinks_pkey" PRIMARY KEY (id),
    CONSTRAINT "Drinks_products_fk" FOREIGN KEY (product_id)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Drinks"
    OWNER to postgres

-- Table: public.Flavors

-- DROP TABLE IF EXISTS public."Flavors";

CREATE TABLE IF NOT EXISTS public."Flavors"
(
    id integer NOT NULL DEFAULT nextval('"Flavors_id_seq"'::regclass),
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Flavors_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Flavors"
    OWNER to postgres;

-- Table: public.Pizzas

-- DROP TABLE IF EXISTS public."Pizzas";

CREATE TABLE IF NOT EXISTS public."Pizzas"
(
    id integer NOT NULL DEFAULT nextval('"Pizzas_id_seq"'::regclass),
    flavor_id integer NOT NULL,
    product_id integer NOT NULL,
    CONSTRAINT "Pizzas_pkey" PRIMARY KEY (id),
    CONSTRAINT pizza_flavor_fk FOREIGN KEY (flavor_id)
        REFERENCES public."Flavors" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pizza_product_fk FOREIGN KEY (product_id)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Pizzas"
    OWNER to postgres;

-- Table: public.Shopping_Cart

-- DROP TABLE IF EXISTS public."Shopping_Cart";

CREATE TABLE IF NOT EXISTS public."Shopping_Cart"
(
    customer_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    total_price numeric(10,2) NOT NULL,
    CONSTRAINT "Shopping_Cart_pkey" PRIMARY KEY (customer_id, product_id),
    CONSTRAINT shopping_cart_customer_id_fk FOREIGN KEY (customer_id)
        REFERENCES public."Customers" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT shoppingcart_product_id_fk FOREIGN KEY (product_id)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Shopping_Cart"
    OWNER to postgres;

-- Table: public.Orders

-- DROP TABLE IF EXISTS public."Orders";

CREATE TABLE IF NOT EXISTS public."Orders"
(
    id integer NOT NULL DEFAULT nextval('"Orders_id_seq"'::regclass),
    customer_id integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    date date NOT NULL,
    CONSTRAINT "Orders_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Orders"
    OWNER to postgres;

-- Table: public.Order_items

-- DROP TABLE IF EXISTS public."Order_items";

CREATE TABLE IF NOT EXISTS public."Order_items"
(
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    CONSTRAINT "Order_items_pkey" PRIMARY KEY (order_id, product_id),
    CONSTRAINT "orderItems_order_id" FOREIGN KEY (order_id)
        REFERENCES public."Orders" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "orderItems_product_id" FOREIGN KEY (product_id)
        REFERENCES public."Products" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Order_items"
    OWNER to postgres;
