create table student (
	id serial primary key,
	name varchar(150)
);

create table course (
	id serial primary key,
	name varchar(150)
);

create enrollment (
	student_id BIGINT UNSIGNED NOT NULL,
	course_id BIGINT UNSIGNED NOT NULL,

	constraint fk_enrollment_student foreign key student_id references student(id) on delete cascade,
	constraint fk_enrollment_course foreign key student_id references course(id) on delete cascade
);


