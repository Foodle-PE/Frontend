export default class Alert {
    constructor({ id, alertType, message, severity, date }) {
        this.Id = id;
        this.AlertType = alertType;
        this.Message = message;
        this.Severity = severity;
        this.Date = date;
    }
}