import AppointmentSummary from "./components/AppointmentSummary.js";

const app = Vue.createApp({
    components: {
        AppointmentSummary
    },

    data() {
        return {
            step: 1,

            form: {
                patientName: "",
                phone: "",
                doctor: "",
                date: "",
                time: ""
            },

            errors: {
                patientName: "",
                phone: "",
                doctor: "",
                date: "",
                time: ""
            },

            appointments: [
                {
                    id: 1,
                    patientName: "Іваненко Іван",
                    phone: "+380671112233",
                    doctor: "Лепеха Г. — Терапевт",
                    date: "2026-05-10",
                    time: "10:00"
                },
                {
                    id: 2,
                    patientName: "Петренко Марія",
                    phone: "+380501234567",
                    doctor: "Гусакова В. — Кардіолог",
                    date: "2026-05-11",
                    time: "11:30"
                },
                {
                    id: 3,
                    patientName: "Сидоренко Олег",
                    phone: "+380931112244",
                    doctor: "Григорій Л. — Стоматолог",
                    date: "2026-05-12",
                    time: "09:45"
                },
                {
                    id: 4,
                    patientName: "Коваленко Анна",
                    phone: "+380991234321",
                    doctor: "Петруньок А. — Окуліст",
                    date: "2026-05-13",
                    time: "14:00"
                },
                {
                    id: 5,
                    patientName: "Мельник Дмитро",
                    phone: "+380681231212",
                    doctor: "Петруша І. — ЛОР",
                    date: "2026-05-14",
                    time: "15:20"
                },
                {
                    id: 6,
                    patientName: "Шевченко Олена",
                    phone: "+380731234567",
                    doctor: "Дуплик М. — Електрик",
                    date: "2026-05-15",
                    time: "12:00"
                }
            ]
        };
    },

    computed: {
        isFormValid() {
            return (
                this.form.patientName.trim().length >= 3 &&
                /^\+380\d{9}$/.test(this.form.phone) &&
                this.form.doctor !== "" &&
                this.form.date !== "" &&
                this.form.time !== "" &&
                this.errors.date === ""
            );
        }
    },

    watch: {
        "form.date"(newDate) {
            if (!newDate) {
                this.errors.date = "Оберіть дату прийому.";
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const selectedDate = new Date(newDate);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                this.errors.date = "Не можна обрати минулу дату.";
            } else {
                this.errors.date = "";
            }
        }
    },

    methods: {
        goToConfirm() {
            this.validateForm();

            if (this.isFormValid) {
                this.step = 2;
            }
        },

        validateForm() {
            this.errors.patientName = "";
            this.errors.phone = "";
            this.errors.doctor = "";
            this.errors.date = "";
            this.errors.time = "";

            if (this.form.patientName.trim().length < 3) {
                this.errors.patientName = "ПІБ має містити мінімум 3 символи.";
            }

            if (!/^\+380\d{9}$/.test(this.form.phone)) {
                this.errors.phone = "Телефон має бути у форматі +380XXXXXXXXX.";
            }

            if (this.form.doctor === "") {
                this.errors.doctor = "Оберіть лікаря.";
            }

            if (this.form.date === "") {
                this.errors.date = "Оберіть дату прийому.";
            }

            if (this.form.time === "") {
                this.errors.time = "Оберіть час прийому.";
            }
        },

        confirmAppointment() {
            const newAppointment = {
                id: Date.now(),
                patientName: this.form.patientName,
                phone: this.form.phone,
                doctor: this.form.doctor,
                date: this.form.date,
                time: this.form.time
            };

            this.appointments.push(newAppointment);
            this.step = 3;
        },

        resetForm() {
            this.form.patientName = "";
            this.form.phone = "";
            this.form.doctor = "";
            this.form.date = "";
            this.form.time = "";

            this.errors.patientName = "";
            this.errors.phone = "";
            this.errors.doctor = "";
            this.errors.date = "";
            this.errors.time = "";

            this.step = 1;
        }
    }
});

app.mount("#app");