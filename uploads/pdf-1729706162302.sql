use hospital_josuecazares;

select * from paciente;
select * from medico;
select * from ingreso;
alter table medico drop horario;
alter table ingreso  drop Costo;

insert into medico(id_medico,nombre,apellido_pat,apellido_mat,especialidad) values (01,'Zuriel','Mora','Nicasio','Ginecologo');
insert into medico(id_medico,nombre,apellido_pat,apellido_mat,especialidad) values (02,'Guadalupe','Gutierrez','Lopez','General');
insert into medico(id_medico,nombre,apellido_pat,apellido_mat,especialidad) values (03,'Andrea','Zolis','Herrera','Cardiologo');

insert into paciente(NSS,nombre,apellido_pat,apellido_mat,edad) values ('SSS001','Lupita','Gutierrez','Zepeda',24);
insert into paciente(NSS,nombre,apellido_pat,apellido_mat,edad) values ('SSS002','Noemi','Arechiga','Zepeda',23);
insert into paciente(NSS,nombre,apellido_pat,apellido_mat,edad) values ('SSS003','Alexey','Valdovinos','Juarez',25);

insert into ingreso (id_ingreso,habitacion,enfermedad,fecha,NSSfk,id_medicofk) values(01,'01A','Cancer','2000-12-12','SSS001',01);
insert into ingreso (id_ingreso,habitacion,enfermedad,fecha,NSSfk,id_medicofk) values(02,'02B','Colon inflamado','2005-4-8','SSS002',02);
insert into ingreso (id_ingreso,habitacion,enfermedad,fecha,NSSfk,id_medicofk) values(03,'03c','Quemaduras','2003-10-8','SSS003',03);

alter table medico add horario varchar (30) not null;
alter table medico add titulado varchar (30) not null;
alter table paciente add tel1 varchar (30) not null;
alter table ingreso add Costo double (5,2) not null;

alter table medico drop titulado;
alter table paciente drop tel1;

drop table ingreso;