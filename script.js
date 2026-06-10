// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ==================== ELEMENTOS ====================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyLabel = document.getElementById('monthly');
    const yearlyLabel = document.getElementById('yearly');
    const priceStarter = document.getElementById('price-starter');
    const pricePro = document.getElementById('price-pro');
    const ctaButtons = document.querySelectorAll('.btn--primary');

    // ==================== MENU MOBILE ====================
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        
        const icon = navToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    navToggle.addEventListener('click', toggleMobileMenu);

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Fecha menu mobile ao clicar
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // ==================== TOGGLE DE PREÇOS ====================
    function updatePricing(isAnnual) {
        if (isAnnual) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');

            priceStarter.innerHTML = `
                <span class="currency">R$</span>23
                <span class="period">/mês</span>
                <small style="display:block; font-size:0.85rem; color:#64748b; margin-top:4px;">
                    cobrado anualmente
                </small>
            `;

            pricePro.innerHTML = `
                <span class="currency">R$</span>63
                <span class="period">/mês</span>
                <small style="display:block; font-size:0.85rem; color:#64748b; margin-top:4px;">
                    cobrado anualmente
                </small>
            `;
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');

            priceStarter.innerHTML = `
                <span class="currency">R$</span>29
                <span class="period">/mês</span>
            `;

            pricePro.innerHTML = `
                <span class="currency">R$</span>79
                <span class="period">/mês</span>
            `;
        }
    }

    billingToggle.addEventListener('change', () => {
        updatePricing(billingToggle.checked);
    });

    // ==================== BOTÕES CTA ====================
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Simulação de ação
            const message = btn.textContent.includes('Grátis') || 
                           btn.textContent.includes('Agora') ? 
                           '🎉 Redirecionando para o cadastro...' : 
                           '✅ Ação registrada!';
            
            alert(message);
            // Em produção: window.location.href = '/cadastro';
        });
    });

    // ==================== FECHAR MENU COM ESC ====================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ==================== FECHAR MENU AO CLICAR FORA ====================
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ==================== ACCESSIBILITY ====================
    navToggle.setAttribute('aria-expanded', 'false');
    
    // Atualiza aria-expanded quando o menu muda
    const observer = new MutationObserver(() => {
        navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active').toString());
    });
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
});
