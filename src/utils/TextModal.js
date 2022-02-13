import Swal from "sweetalert2";

export const SwalAlert = (title = "Alert", text, icon = 'info') => Swal.mixin({
  title: title,
  icon: icon,
  text: '"'+text+'"',
  showCloseButton: true,
  showConfirmButton: false,
})