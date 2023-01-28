import Swal from "sweetalert2";

function generateAlert(type, message) {
    return Swal.fire((type === "error" ? "Error!" : "Success!"), `${message}`, (type === "error" ? "warning" : "success"));
}

export { generateAlert };