import Swal from "sweetalert2"

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const SwalToast = (title, icon = 'success') => {
  Toast.fire({
    icon: icon,
    title: title
  })
}
