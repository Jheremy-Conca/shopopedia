import Swal from 'sweetalert2'

export function useSwal() {
  const showAlert = async (options) => {
    return await Swal.fire(options)
  }
  const showSuccess = async (message) => {
    return await showAlert({
      tittle: 'Success!',
      text: message,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const showError = async (message) => {
    return await showAlert({
      tittle: 'Error Encountered!',
      text: message,
      icon: 'error',
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const showConfirm = async (message) => {
    return await showAlert({
      tittle: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      ConfirmButtonColor: '#3085d6',
      cancelButton: '#d33',
      ConfirmButtonText: 'Yest, delete it!',
    })
  }

  return { showSuccess, showConfirm, showError }
}
