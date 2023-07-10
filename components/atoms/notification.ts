import { notification as antNotification } from 'antd'

const notification = antNotification
notification.config({
  placement: 'bottomRight',
  duration: 3,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toast(props: { title: string; description: string | any }) {
  notification.info({
    message: props.title,
    description: props.description,
  })
}

export { toast, notification }
