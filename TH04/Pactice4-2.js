function GetTime() {
    const today = new Date()
    const dayNames = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const day = dayNames[today.getDay()]
    const month = String(today.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
    const date = String(today.getDate()).padStart(2, '0')
    const year = today.getFullYear()
    const hours = String(today.getHours()).padStart(2, '0')
    const minutes = String(today.getMinutes()).padStart(2, '0')
    const seconds = String(today.getSeconds()).padStart(2, '0')

    // Kiểm tra tính hợp lệ của thời gian
    if (hours.length === 2 && minutes.length === 2 && seconds.length === 2) {
        const timeString = `${day}, ${date}/${month}/${year} ${hours}:${minutes}:${seconds}`
        document.querySelector('.time').innerHTML = timeString
    }
}

function updateClock() {
    GetTime()
    setTimeout(updateClock, 1000) // Cập nhật mỗi giây
}

updateClock() // Bắt đầu đồng hồ
