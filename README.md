We should start by making a user module with a Auth, we can tackle it front end and backend in the same time, test it and then proceed to next module 

users are two categories users and Admins for now Admins can view All users so current stuff that we need to implement is :

1- Register
2- Login
3- CRUD without a delete for the user we are going to do soft Deletes, Put a an extra field in the user table named Deleted and queries get non deleted user
4- the ability for admins to view all users.


User Stories:

patient: receives "update" by email, when it is administered on the system

submit a recurring feedback (once or twice per), ticket like message, that later is met with a response. 

can pick a "prefered time for a first appointment " to book (to do this he must register and fill his data)

receives a "schedule" made by the secretary

can cancel one of the "schedule" appointments, 2 times per month and ask for a compensation (later)
 
makes payments in his outstanding balance(later)

can view his outstanding balance (GUC kind of thing)

patient has personal data that includes: (name, date of first appointment, Date of birth, nationality, address, picture(link from and fts)
,(Mo/fa)ther's age, (Mo/fa)ther's job, number of siblings, order in siblings, original complaint(text field), previous managment )

patient has a medical history(will be declared in later stages for now make a table for it and link it to the patient)

patient has a family history that includes similar cases in family and upbringings(details will come in later stages, Agile lol) (create table and link to patient)

patient has multiple test records, a test record will include date, time and multiple preset fields example(iq test, lang test, cars, gelium, conors, etc.) and an extra field for specific cases.



--------------------------------------------------------------------------
secretary: creates a schedule for the patient

picks a date for a compensation for canceled appointments

assigns a date for the first appointment of the patient (questionable)

registers cash payment of patients

can make "announcments" to all patients 

registers attendace for patients 

send an email to the patient

assign a reminder to the patient (will appear on site as notifications)


-----------------------------------------------------------
doctor: assign an update 

respond to feeback

super user does everything access all CRUDs





Dictionary for Objects:

Blance: when a patient has a schedule a balance is initialized with a monthly fixed cost that depends on the Schedule appointment cost both should be documented
and the reason for setting the price, aka:"nekabet mohandeseen, taba3 ta2meen se7y X"

Balance change: any change in the balance, monthly fee on balance or payment from patient should be registered(date of payment, amount, notes)

schedule: from 1 day to 5 days with starting hour per each day, per week, fixed. can't be edited by the patient. (viewable by Doc, Sec, and the specific patient)

first appointment: first time appointment date and time

attendance for schedule appointments: date, time did he attend or not, compensate or not

update: a confidential document, can be seen by the doctor and patient only, that is created by the Doctor every month or two that gets sent by email upon creation.
 with a date and time for an update session

announcments: a Text message that gets sent to all Emails on the system. ([out of scope] later will include whatsapp msgs to numbers this is feasible don't worry).

