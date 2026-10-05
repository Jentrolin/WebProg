document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointment-form");

    const patientNameInput = document.getElementById("patient-name");
    const doctorSelect = document.getElementById("doctor-select");
    const dateInput = document.getElementById("appointment-date");
    const timeInput = document.getElementById("appointment-time");

    const nameError = document.getElementById("name-error");
    const doctorError = document.getElementById("doctor-error");
    const dateError = document.getElementById("date-error");
    const timeError = document.getElementById("time-error");

    const appointmentsBody = document.getElementById("appointments-body");
    const emptyMessage = document.getElementById("empty-message");

    form.addEventListener("submit", handleFormSubmit);
    appointmentsBody.addEventListener("click", handleCancelClick);

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        addAppointmentRow(
            patientNameInput.value.trim(),
            doctorSelect.value,
            dateInput.value,
            timeInput.value
        );

        form.reset();
        updateEmptyMessage();
    }

    function validateForm() {
        let isValid = true;

        clearErrors();

        if (patientNameInput.value.trim().length < 3) {
            nameError.textContent = "Введіть ПІБ пацієнта, мінімум 3 символи.";
            isValid = false;
        }

        if (doctorSelect.value === "") {
            doctorError.textContent = "Оберіть лікаря зі списку.";
            isValid = false;
        }

        if (dateInput.value === "") {
            dateError.textContent = "Оберіть дату прийому.";
            isValid = false;
        }

        if (timeInput.value === "") {
            timeError.textContent = "Оберіть час прийому.";
            isValid = false;
        }

        return isValid;
    }

    function clearErrors() {
        nameError.textContent = "";
        doctorError.textContent = "";
        dateError.textContent = "";
        timeError.textContent = "";
    }

    function addAppointmentRow(name, doctor, date, time) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = name;

        const doctorCell = document.createElement("td");
        doctorCell.textContent = doctor;

        const dateCell = document.createElement("td");
        dateCell.textContent = date;

        const timeCell = document.createElement("td");
        timeCell.textContent = time;

        const actionCell = document.createElement("td");
        const cancelButton = document.createElement("button");

        cancelButton.textContent = "Скасувати";
        cancelButton.classList.add("cancel-btn");
        cancelButton.setAttribute("type", "button");

        actionCell.appendChild(cancelButton);

        row.appendChild(nameCell);
        row.appendChild(doctorCell);
        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(actionCell);

        appointmentsBody.appendChild(row);
    }

    function handleCancelClick(event) {
        if (event.target.classList.contains("cancel-btn")) {
            const row = event.target.closest("tr");
            row.remove();
            updateEmptyMessage();
        }
    }

    function updateEmptyMessage() {
        if (appointmentsBody.children.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    }

    updateEmptyMessage();
});