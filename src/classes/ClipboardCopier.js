import { burst } from "../utils/MojsBurst"
import { SwalToast } from "../utils/ToastMessage"

export const CopyToClipboard = (text, shareText="Copied! Share to your friends!") => {

  const solnInput = document.createElement('textarea')
  solnInput.value = text
  document.body.appendChild(solnInput)
  solnInput.select()
  document.execCommand('copy')
  document.body.removeChild(solnInput)
  burst.play()
  console.log('copied')

  SwalToast(shareText)
  return true
}