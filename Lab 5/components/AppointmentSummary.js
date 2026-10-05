export default {
    name: "AppointmentSummary",

    props: {
        appointment: {
            type: Object,
            required: true
        }
    },

    emits: ["confirm", "back"],

    template: `
        <div class="summary-box">
            <h3>Підтвердження запису</h3>

            <p><strong>Пацієнт:</strong> {{ appointment.patientName }}</p>
            <p><strong>Телефон:</strong> {{ appointment.phone }}</p>
            <p><strong>Лікар:</strong> {{ appointment.doctor }}</p>
            <p><strong>Дата:</strong> {{ appointment.date }}</p>
            <p><strong>Час:</strong> {{ appointment.time }}</p>

            <div class="summary-buttons">
                <button type="button" @click="$emit('back')">
                    Назад
                </button>

                <button type="button" @click="$emit('confirm')">
                    Підтвердити запис
                </button>
            </div>
        </div>
    `
};