let ws = null

const btnConnect = document.getElementById('btnConnect')
const btnDisconnect = document.getElementById('btnDisconect')
const btnSend = document.getElementById('btnSend')
const chat = document.getElementById('chat')
const txtMsg = document.getElementById('txtMsg')
const txtName = document.getElementById('name')

const setText = data => {
    const msg = `<div>${data}</div>`
    chat.insertAdjacentHTML('beforeend', msg)
}

const setMessage = data => {
    const msg = `<div><span>${data.name}</span>: <span>${data.message}</span></div>`
    chat.insertAdjacentHTML('beforeend', msg)
}

btnConnect.addEventListener('click', e => {
    ws = new WebSocket('ws://demos.kaazing.com/echo')
    ws.onopen = () => setText('conectado')
    ws.onclose = () => setText('Desconectado')
    ws.onerror = e => setText(e)
    ws.onmessage = e => {
        const msg = JSON.parse(e.data)
        setMessage(msg)
    }
})
btnDisconnect.addEventListener('click', e => {
    ws.onclose()
})
btnSend.addEventListener('click', e => {
    const msg = {
        name: txtName.value,
        message: txtMsg.value
    }
    ws.send(JSON.stringify(msg))
})