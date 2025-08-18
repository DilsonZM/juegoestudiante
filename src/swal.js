import Swal from 'sweetalert2'

export function showErrorSwal(message) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message || 'Error desconocido',
    confirmButtonColor: '#1dd1c6',
    background: '#131a3a',
    color: '#e8ecf4',
    customClass: {
      popup: 'swal2-modern',
      confirmButton: 'swal2-btn-modern'
    }
  })
}
