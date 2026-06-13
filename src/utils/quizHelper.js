// Fungsi untuk mem-format timer dengan 00:00
export const formatTimer = (seconds) => {
    // Simpan detik ke dalam variabel
    const totalSeconds = seconds < 0 ? 0 : seconds

    // Mem-format menit dengan dibulatkan ke bawah
    const mins = Math.floor(totalSeconds / 60)
    // Mem-format menit dengan modulus 60
    const secs = totalSeconds % 60

    // Display menit 2 angka dimulai dengan 0
    const displayMins = String(mins).padStart(2, '0')
    // Display detik 2 angka dimulai dengan 0
    const displaySecs = String(secs).padStart(2, '0')

    // Format akhir 00:00
    return `${displayMins}:${displaySecs}`
}

// Fungsi untuk mengacak jawaban quiz
export const shuffleArray = (array) => {
    // Mengambil array
    const shuffled = [...array];
    // Untuk setiap i = panjang dari array, selama i lebih dari 0, i dikurang setiap iterasi
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

// Fungsi untuk mengambil waktu total pengerjaan kuis
export const finalTime = (totalTimer, currentTimer) => {
    return formatTimer(totalTimer - currentTimer)
}