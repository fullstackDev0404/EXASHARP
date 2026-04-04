ALTER TABLE "employee" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "employee_user_idx" ON "employee" USING btree ("user_id");--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_user" UNIQUE("user_id");