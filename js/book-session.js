/**
 * Book Session JavaScript for Advisor website
 * Handles the multi-step booking form and its functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
    const stepLabels = ['step-1-label', 'step-2-label', 'step-3-label', 'step-4-label'];
    let currentStep = 0;
    let bookingData = {
        serviceName: null,
        servicePrice: null,
        consultant: null,
        date: null,
        time: null,
        fullName: null,
        email: null,
        phone: null,
        grade: null,
        notes: null,
    };

    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container'); // To hide progress bar later
    const bookingSuccessDiv = document.getElementById('booking-success');

    function updateUIForStep(stepIndex) {
        steps.forEach((stepId, index) => {
            const stepElement = document.getElementById(stepId);
            if (index === stepIndex) {
                stepElement.classList.remove('hidden');
                stepElement.style.opacity = 0;
                setTimeout(() => stepElement.style.opacity = 1, 50); // Fade in
            } else {
                stepElement.classList.add('hidden');
                stepElement.style.opacity = 0;
            }
        });
        progressBar.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
        
        stepLabels.forEach((labelId, index) => {
            const labelElement = document.getElementById(labelId);
            if (index <= stepIndex) {
                labelElement.classList.remove('text-gray-500');
                labelElement.classList.add('text-primary', 'font-bold');
            } else {
                labelElement.classList.remove('text-primary', 'font-bold');
                labelElement.classList.add('text-gray-500');
            }
        });
    }

    // Step 1: Service Selection
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            serviceOptions.forEach(opt => opt.classList.remove('selected', 'border-primary', 'shadow-lg'));
            this.classList.add('selected', 'border-primary', 'shadow-lg');
            bookingData.serviceName = this.dataset.serviceName;
            bookingData.servicePrice = parseFloat(this.dataset.servicePrice);
        });
    });

    document.getElementById('step-1-next').addEventListener('click', () => {
        if (!bookingData.serviceName) {
            alert('الرجاء اختيار نوع الخدمة للمتابعة.');
            return;
        }
        currentStep = 1;
        updateUIForStep(currentStep);
    });

    // Step 2: Consultant, Date, Time
    document.getElementById('step-2-prev').addEventListener('click', () => {
        currentStep = 0;
        updateUIForStep(currentStep);
    });
    document.getElementById('step-2-next').addEventListener('click', () => {
        const consultant = document.getElementById('consultant').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        if (!consultant || !date || !time) {
            alert('الرجاء اختيار المستشار والتاريخ والوقت.');
            return;
        }
        bookingData.consultant = consultant;
        bookingData.date = date;
        bookingData.time = time;
        currentStep = 2;
        updateUIForStep(currentStep);
    });

    // Step 3: Personal Information
    document.getElementById('step-3-prev').addEventListener('click', () => {
        currentStep = 1;
        updateUIForStep(currentStep);
    });
    document.getElementById('step-3-next').addEventListener('click', () => {
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const grade = document.getElementById('grade').value.trim();
        const notes = document.getElementById('notes').value.trim();

        if (!fullName || !email || !phone) {
            alert('الرجاء إدخال الاسم الكامل والبريد الإلكتروني ورقم الهاتف.');
            return;
        }
        // Basic email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('الرجاء إدخال بريد إلكتروني صحيح.');
            return;
        }
        // Basic phone validation (example: Saudi numbers)
        if (!/^(05\d{8})$/.test(phone) && !/^\+9665\d{8}$/.test(phone) && !/^\d{9,10}$/.test(phone)) {
             // Allow more general phone numbers too, this is just an example
            // alert('الرجاء إدخال رقم هاتف صحيح (مثال: 0512345678).');
            // return; 
        }


        bookingData.fullName = fullName;
        bookingData.email = email;
        bookingData.phone = phone;
        bookingData.grade = grade;
        bookingData.notes = notes;
        
        updateBookingSummary();
        currentStep = 3;
        updateUIForStep(currentStep);
    });

    // Step 4: Confirmation
    function updateBookingSummary() {
        document.getElementById('summary-service').textContent = bookingData.serviceName || 'غير محدد';
        document.getElementById('summary-consultant').textContent = bookingData.consultant || 'غير محدد';
        document.getElementById('summary-date').textContent = bookingData.date ? new Date(bookingData.date).toLocaleDateString('ar-SA') : 'غير محدد';
        document.getElementById('summary-time').textContent = bookingData.time ? formatTime(bookingData.time) : 'غير محدد';
        document.getElementById('summary-name').textContent = bookingData.fullName || 'غير محدد';
        document.getElementById('summary-email').textContent = bookingData.email || 'غير محدد';
        document.getElementById('summary-phone').textContent = bookingData.phone || 'غير محدد';
        
        const gradeContainer = document.getElementById('summary-grade-container');
        const gradeEl = document.getElementById('summary-grade');
        if (bookingData.grade) {
            gradeEl.textContent = bookingData.grade;
            gradeContainer.style.display = 'flex';
        } else {
            gradeContainer.style.display = 'none';
        }

        document.getElementById('summary-price').textContent = bookingData.servicePrice ? `${bookingData.servicePrice} ر.س` : '0 ر.س';
    }

    function formatTime(timeString) { // e.g. "09:00"
        if (!timeString) return '';
        const [hour, minute] = timeString.split(':');
        const h = parseInt(hour);
        const period = h >= 12 ? 'مساءً' : 'صباحاً';
        const displayHour = h % 12 === 0 ? 12 : h % 12;
        return `${displayHour}:${minute} ${period}`;
    }


    document.getElementById('step-4-prev').addEventListener('click', () => {
        currentStep = 2;
        updateUIForStep(currentStep);
    });

    document.getElementById('confirm-booking').addEventListener('click', () => {
        const termsChecked = document.getElementById('terms').checked;
        const privacyChecked = document.getElementById('privacy').checked;

        if (!termsChecked || !privacyChecked) {
            alert('الرجاء الموافقة على الشروط والأحكام وسياسة الخصوصية.');
            return;
        }

        // Hide form steps and progress bar
        steps.forEach(stepId => document.getElementById(stepId).classList.add('hidden'));
        if (progressContainer) {
            progressContainer.classList.add('hidden');
        }
        
        // Show success message
        bookingSuccessDiv.classList.remove('hidden');
        bookingSuccessDiv.style.opacity = 0;
        setTimeout(() => bookingSuccessDiv.style.opacity = 1, 50);


        // Populate success message details (example)
        document.getElementById('booking-ref-number').textContent = `#ADV${Math.floor(Math.random() * 90000) + 10000}`;
        document.getElementById('booking-confirmed-date').textContent = bookingData.date ? new Date(bookingData.date).toLocaleDateString('ar-SA') : 'سيتم التأكيد';
        document.getElementById('booking-confirmed-time').textContent = bookingData.time ? formatTime(bookingData.time) : 'سيتم التأكيد';

        // Optionally, you can reset the form or redirect after a delay
        console.log('Booking Confirmed:', bookingData);
    });
    
    // Initialize date input to prevent past dates
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }


    // Initial UI setup
    updateUIForStep(currentStep);
});





