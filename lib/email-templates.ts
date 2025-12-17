// lib/email-templates.ts

export type OrderDetails = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  ticketType: string;
  date: string;
  time: string;
  adults: number;
  reduced: number;
  total: number;
  language?: string;
};

// --- 1. RENDELÉS VISSZAIGAZOLÁS (CONFIRMATION) - PREMIUM RESELLER STYLE ---
const translations: Record<string, any> = {
  en: {
    subject: "Order Received - Access To Italy",
    header_title: "ACCESS TO ITALY",
    hero_title: "Payment Successful",
    hero_subtitle: "Dear <strong>{{name}}</strong>, we are honored that you chose us for your visit. Your transaction has been securely processed.",
    
    // Alázatosabb, informatívabb "mi történik most" rész
    status_title: "Securing Your Reservation",
    status_text: "<strong>We are currently finalizing your reservation with the venue.</strong><br><br>To ensure a seamless entry, we perform a manual verification on every booking. This usually takes <strong>10-15 minutes</strong>.<br><br>You will receive your <strong>Verified Digital Tickets</strong> in a separate email shortly. We appreciate your patience while we prepare your extraordinary experience.",
    
    customer_card_title: "Primary Guest",
    customer_status: "CONFIRMED",
    section_order: "Experience Details",
    label_ref: "Reference ID",
    label_ticket: "Selected Experience",
    label_date: "Scheduled Entry",
    label_guests: "Party Size",
    label_adults: "Adults",
    label_reduced: "Reduced",
    label_total: "Total Paid",
    
    section_faq: "Useful Information",
    faq_1_q: "When will I get my tickets?",
    faq_1_a: "Within 15-30 minutes. We ensure each ticket is valid and ready for scanning. Please check your Spam folder just in case.",
    faq_2_q: "Do I need to print anything?",
    faq_2_a: "No printing required. Your tickets will be optimized for mobile scanning.",
    
    footer_text: "Thank you for trusting Access To Italy.",
    footer_contact: "Customer Care:"
  },
  it: {
    subject: "Ordine Ricevuto - Access To Italy",
    header_title: "ACCESS TO ITALY",
    hero_title: "Pagamento Riuscito",
    hero_subtitle: "Gentile <strong>{{name}}</strong>, siamo onorati che tu ci abbia scelto. La tua transazione è stata elaborata in modo sicuro.",
    
    status_title: "Finalizzazione della Prenotazione",
    status_text: "<strong>Stiamo completando la tua prenotazione con la struttura.</strong><br><br>Per garantire un ingresso senza intoppi, eseguiamo una verifica su ogni prenotazione. Questo richiede solitamente <strong>10-15 minuti</strong>.<br><br>Riceverai i tuoi <strong>Biglietti Digitali Verificati</strong> in un'email separata a breve. Apprezziamo la tua pazienza mentre prepariamo la tua esperienza.",
    
    customer_card_title: "Ospite Principale",
    customer_status: "CONFERMATO",
    section_order: "Dettagli Esperienza",
    label_ref: "Riferimento",
    label_ticket: "Esperienza Selezionata",
    label_date: "Ingresso Previsto",
    label_guests: "Gruppo",
    label_adults: "Adulti",
    label_reduced: "Ridotti",
    label_total: "Totale Pagato",
    
    section_faq: "Informazioni Utili",
    faq_1_q: "Quando riceverò i biglietti?",
    faq_1_a: "Entro 15-30 minuti. Verifichiamo che ogni biglietto sia pronto per la scansione. Controlla anche la cartella Spam.",
    faq_2_q: "Devo stampare qualcosa?",
    faq_2_a: "Nessuna stampa necessaria. I biglietti sono ottimizzati per lo smartphone.",
    
    footer_text: "Grazie per aver scelto Access To Italy.",
    footer_contact: "Assistenza Clienti:"
  },
  de: {
    subject: "Bestellung Erhalten - Access To Italy",
    header_title: "ACCESS TO ITALY",
    hero_title: "Zahlung Erfolgreich",
    hero_subtitle: "Lieber <strong>{{name}}</strong>, es ist uns eine Ehre, dass Sie uns gewählt haben. Ihre Transaktion wurde sicher verarbeitet.",
    
    status_title: "Reservierung wird gesichert",
    status_text: "<strong>Wir schließen derzeit Ihre Reservierung beim Veranstaltungsort ab.</strong><br><br>Um einen reibungslosen Einlass zu gewährleisten, überprüfen wir jede Buchung sorgfältig. Dies dauert in der Regel <strong>10-15 Minuten</strong>.<br><br>Sie erhalten Ihre <strong>Verifizierten Digitalen Tickets</strong> in Kürze in einer separaten E-Mail. Wir danken Ihnen für Ihre Geduld.",
    
    customer_card_title: "Hauptgast",
    customer_status: "BESTÄTIGT",
    section_order: "Erlebnis-Details",
    label_ref: "Referenz-ID",
    label_ticket: "Gewähltes Erlebnis",
    label_date: "Geplanter Einlass",
    label_guests: "Gruppe",
    label_adults: "Erwachsene",
    label_reduced: "Ermäßigt",
    label_total: "Gesamtbetrag",
    
    section_faq: "Nützliche Informationen",
    faq_1_q: "Wann erhalte ich meine Tickets?",
    faq_1_a: "Innerhalb von 15-30 Minuten. Wir stellen sicher, dass jedes Ticket gültig ist. Bitte prüfen Sie auch Ihren Spam-Ordner.",
    faq_2_q: "Muss ich etwas ausdrucken?",
    faq_2_a: "Nein, kein Drucken erforderlich. Ihre Tickets sind für das Smartphone optimiert.",
    
    footer_text: "Danke für Ihr Vertrauen in Access To Italy.",
    footer_contact: "Kundenservice:"
  },
  es: {
    subject: "Pedido Recibido - Access To Italy",
    header_title: "ACCESS TO ITALY",
    hero_title: "Pago Exitoso",
    hero_subtitle: "Estimado <strong>{{name}}</strong>, es un honor que nos haya elegido. Su transacción ha sido procesada de forma segura.",
    
    status_title: "Asegurando su Reserva",
    status_text: "<strong>Estamos finalizando su reserva con el lugar.</strong><br><br>Para garantizar una entrada fluida, verificamos cada reserva manualmente. Esto suele tardar <strong>10-15 minutos</strong>.<br><br>Recibirá sus <strong>Entradas Digitales Verificadas</strong> en un correo separado en breve. Agradecemos su paciencia mientras preparamos su experiencia.",
    
    customer_card_title: "Huésped Principal",
    customer_status: "CONFIRMADO",
    section_order: "Detalles de la Experiencia",
    label_ref: "Referencia",
    label_ticket: "Experiencia",
    label_date: "Entrada Programada",
    label_guests: "Grupo",
    label_adults: "Adultos",
    label_reduced: "Reducido",
    label_total: "Total Pagado",
    
    section_faq: "Información Útil",
    faq_1_q: "¿Cuándo recibiré mis entradas?",
    faq_1_a: "En 15-30 minutos. Nos aseguramos de que cada entrada esté lista para escanear. Por favor revise su carpeta de Spam.",
    faq_2_q: "¿Necesito imprimir algo?",
    faq_2_a: "No es necesario imprimir. Sus entradas están optimizadas para móviles.",
    
    footer_text: "Gracias por confiar en Access To Italy.",
    footer_contact: "Atención al Cliente:"
  },
  fr: {
    subject: "Commande Reçue - Access To Italy",
    header_title: "ACCESS TO ITALY",
    hero_title: "Paiement Réussi",
    hero_subtitle: "Cher <strong>{{name}}</strong>, nous sommes honorés de votre choix. Votre transaction a été traitée en toute sécurité.",
    
    status_title: "Finalisation de la Réservation",
    status_text: "<strong>Nous finalisons actuellement votre réservation auprès du lieu.</strong><br><br>Pour garantir une entrée fluide, nous vérifions chaque réservation. Cela prend généralement <strong>10 à 15 minutes</strong>.<br><br>Vous recevrez vos <strong>Billets Numériques Vérifiés</strong> dans un e-mail séparé sous peu. Nous vous remercions de votre patience.",
    
    customer_card_title: "Invité Principal",
    customer_status: "CONFIRMÉ",
    section_order: "Détails de l'Expérience",
    label_ref: "Référence",
    label_ticket: "Expérience",
    label_date: "Entrée Prévue",
    label_guests: "Groupe",
    label_adults: "Adultes",
    label_reduced: "Réduit",
    label_total: "Total Payé",
    
    section_faq: "Informations Utiles",
    faq_1_q: "Quand recevrai-je mes billets ?",
    faq_1_a: "Sous 15 à 30 minutes. Nous vérifions que chaque billet est prêt. Veuillez vérifier votre dossier Spam.",
    faq_2_q: "Dois-je imprimer ?",
    faq_2_a: "Non, aucune impression nécessaire. Vos billets sont optimisés pour mobile.",
    
    footer_text: "Merci de faire confiance à Access To Italy.",
    footer_contact: "Service Client :"
  }
};

// --- 2. JEGY KÜLDÉS (TICKET DELIVERY) - TISZTA ÉS ALÁZATOS ---
const ticketTranslations: Record<string, any> = {
  en: {
    subject: "Your Digital Tickets - Access To Italy",
    hero_title: "Your Visit is Ready",
    hero_subtitle: "Dear <strong>{{name}}</strong>, we are pleased to deliver your verified access passes.",
    
    instruction_title: "How to use",
    instruction_text: "<strong>Your tickets are attached to this email (PDF).</strong><br><br>Simply open the PDF on your smartphone and present the QR code at the entrance. There is no need to visit the ticket office or print anything. We wish you a wonderful visit.",
    
    guest_card_title: "Ticket Holder",
    important_info_title: "Visitor Guidelines",
    info_1: "Please arrive 15 minutes before your scheduled time.",
    info_2: "Respectful attire is required (shoulders/knees covered).",
    info_3: "Security checks are mandatory for all guests.",
    
    footer_text: "We hope you enjoy this extraordinary experience.",
    footer_contact: "Support:"
  },
  it: {
    subject: "I tuoi Biglietti Digitali - Access To Italy",
    hero_title: "La tua Visita è Pronta",
    hero_subtitle: "Gentile <strong>{{name}}</strong>, siamo lieti di consegnarti i tuoi pass verificati.",
    
    instruction_title: "Come usare i biglietti",
    instruction_text: "<strong>I tuoi biglietti sono allegati a questa email (PDF).</strong><br><br>Apri semplicemente il PDF sul tuo smartphone e presenta il codice QR all'ingresso. Non è necessario passare in biglietteria o stampare nulla. Ti auguriamo una splendida visita.",
    
    guest_card_title: "Titolare",
    important_info_title: "Linee Guida Visitatori",
    info_1: "Si prega di arrivare 15 minuti prima dell'orario.",
    info_2: "È richiesto un abbigliamento rispettoso (spalle/ginocchia coperte).",
    info_3: "I controlli di sicurezza sono obbligatori.",
    
    footer_text: "Speriamo che tu possa goderti questa esperienza straordinaria.",
    footer_contact: "Supporto:"
  },
  de: {
    subject: "Ihre Digitalen Tickets - Access To Italy",
    hero_title: "Ihr Besuch ist Bereit",
    hero_subtitle: "Lieber <strong>{{name}}</strong>, wir freuen uns, Ihnen Ihre verifizierten Tickets zu senden.",
    
    instruction_title: "Verwendung",
    instruction_text: "<strong>Ihre Tickets finden Sie im Anhang (PDF).</strong><br><br>Öffnen Sie das PDF einfach auf Ihrem Smartphone und zeigen Sie den QR-Code am Eingang vor. Kein Ausdrucken oder Anstehen am Schalter nötig. Wir wünschen Ihnen einen wunderbaren Besuch.",
    
    guest_card_title: "Ticketinhaber",
    important_info_title: "Besucherrichtlinien",
    info_1: "Bitte erscheinen Sie 15 Minuten vor Ihrer Zeit.",
    info_2: "Angemessene Kleidung erforderlich (Schultern/Knie bedeckt).",
    info_3: "Sicherheitskontrollen sind obligatorisch.",
    
    footer_text: "Wir hoffen, Sie genießen dieses außergewöhnliche Erlebnis.",
    footer_contact: "Support:"
  },
  es: {
    subject: "Sus Entradas Digitales - Access To Italy",
    hero_title: "Su Visita está Lista",
    hero_subtitle: "Estimado <strong>{{name}}</strong>, nos complace entregarle sus pases verificados.",
    
    instruction_title: "Cómo usar",
    instruction_text: "<strong>Sus entradas están adjuntas a este correo (PDF).</strong><br><br>Simplemente abra el PDF en su teléfono y presente el código QR en la entrada. No es necesario imprimir nada ni pasar por taquilla. Le deseamos una visita maravillosa.",
    
    guest_card_title: "Titular",
    important_info_title: "Guía para Visitantes",
    info_1: "Por favor llegue 15 minutos antes de su horario.",
    info_2: "Se requiere vestimenta respetuosa (hombros/rodillas cubiertos).",
    info_3: "Los controles de seguridad son obligatorios.",
    
    footer_text: "Esperamos que disfrute de esta experiencia extraordinaria.",
    footer_contact: "Soporte:"
  },
  fr: {
    subject: "Vos Billets Numériques - Access To Italy",
    hero_title: "Votre Visite est Prête",
    hero_subtitle: "Cher <strong>{{name}}</strong>, nous sommes heureux de vous remettre vos pass vérifiés.",
    
    instruction_title: "Comment utiliser",
    instruction_text: "<strong>Vos billets sont joints à cet e-mail (PDF).</strong><br><br>Ouvrez simplement le PDF sur votre smartphone et présentez le QR code à l'entrée. Pas besoin d'imprimer ou de passer au guichet. Nous vous souhaitons une excellente visite.",
    
    guest_card_title: "Titulaire",
    important_info_title: "Consignes Visiteurs",
    info_1: "Veuillez arriver 15 minutes avant votre horaire.",
    info_2: "Tenue respectueuse exigée (épaules/genoux couverts).",
    info_3: "Les contrôles de sécurité sont obligatoires.",
    
    footer_text: "Nous espérons que vous apprécierez cette expérience extraordinaire.",
    footer_contact: "Support :"
  }
};

// --- FÜGGVÉNYEK ---

// A dizájn alapjai (Luxus Dark Mode - kifinomultabb)
const THEME = {
    bg: "#0a0a0a", // Még mélyebb fekete
    cardBg: "#141414", // Nagyon finom sötétszürke kártya
    gold: "#D4AF37", // Elegánsabb, fémesebb arany
    textPrimary: "#f5f5f5",
    textSecondary: "#a3a3a3",
    border: "#262626"
};

// 1. GENERATE CONFIRMATION EMAIL
export const generateEmailHtml = (data: OrderDetails, locale: string = 'en') => {
  const t = translations[locale] || translations['en'];
  const heroSubtitleParsed = t.hero_subtitle.replace('{{name}}', data.customerName.split(' ')[0]);

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.subject}</title>
    <style>
        body { margin: 0; padding: 0; background-color: ${THEME.bg}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: ${THEME.textPrimary}; }
        table { border-spacing: 0; border-collapse: collapse; }
        td { padding: 0; }
        a { text-decoration: none; color: inherit; }
        .wrapper { width: 100%; table-layout: fixed; background-color: ${THEME.bg}; padding-bottom: 40px; }
        .main-container { margin: 0 auto; max-width: 600px; background-color: ${THEME.cardBg}; border: 1px solid ${THEME.border}; border-radius: 8px; overflow: hidden; }
        @media screen and (max-width: 600px) { .main-container { width: 100% !important; border: none !important; border-radius: 0 !important; } .content-pad { padding: 30px 20px !important; } }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main-container" width="100%">
            <tr>
                <td align="center" style="padding: 40px 0 35px 0; border-bottom: 1px solid ${THEME.border}; background-color: #050505;">
                    <span style="font-family: 'Times New Roman', serif; font-size: 22px; letter-spacing: 5px; color: #ffffff; text-transform: uppercase;">
                        ACCESS<span style="color: ${THEME.gold};">TO</span>ITALY
                    </span>
                </td>
            </tr>

            <tr>
                <td class="content-pad" style="padding: 50px 40px;">
                    
                    <table width="100%">
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: rgba(212, 175, 55, 0.1); display: flex; align-items: center; justify-content: center; line-height: 60px;">
                                    <span style="font-size: 30px; color: ${THEME.gold};">✓</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Times New Roman', serif; font-size: 26px; color: ${THEME.gold}; padding-bottom: 15px; font-weight: 500;">
                                ${t.hero_title}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 15px; line-height: 26px; color: ${THEME.textSecondary}; padding-bottom: 45px; max-width: 80%; margin: 0 auto;">
                                ${heroSubtitleParsed}
                            </td>
                        </tr>
                    </table>

                    <table width="100%" style="background-color: #1a1a1a; border-left: 3px solid ${THEME.gold}; border-radius: 4px; margin-bottom: 45px;">
                        <tr>
                            <td style="padding: 25px;">
                                <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${THEME.gold}; margin-bottom: 10px; letter-spacing: 1.5px;">
                                    ${t.status_title}
                                </div>
                                <div style="font-size: 14px; line-height: 24px; color: #d4d4d4;">
                                    ${t.status_text}
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div style="border: 1px solid ${THEME.border}; border-radius: 8px; margin-bottom: 45px; overflow: hidden;">
                        <div style="background-color: #1f1f1f; padding: 12px 25px; border-bottom: 1px solid ${THEME.border}; display: flex; justify-content: space-between;">
                            <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: ${THEME.textSecondary};">${t.customer_card_title}</span>
                            <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #4ade80;">${t.customer_status}</span>
                        </div>
                        <div style="padding: 25px;">
                            <div style="font-size: 18px; color: #fff; font-weight: 500; margin-bottom: 20px;">${data.customerName}</div>
                            <table width="100%">
                                <tr>
                                    <td valign="top" style="padding-bottom: 10px;">
                                        <div style="font-size: 10px; color: ${THEME.textSecondary}; text-transform: uppercase; margin-bottom: 4px;">Email</div>
                                        <div style="font-size: 14px; color: #fff;">${data.customerEmail}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top">
                                        <div style="font-size: 10px; color: ${THEME.textSecondary}; text-transform: uppercase; margin-bottom: 4px;">Phone</div>
                                        <div style="font-size: 14px; color: #fff;">${data.customerPhone}</div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div style="font-family: 'Times New Roman', serif; font-size: 20px; color: #fff; margin-bottom: 20px; border-bottom: 1px solid ${THEME.border}; padding-bottom: 10px;">
                        ${t.section_order}
                    </div>
                    <table width="100%" style="margin-bottom: 40px;">
                        <tr><td style="padding: 12px 0; color: ${THEME.textSecondary}; font-size: 13px; border-bottom: 1px solid ${THEME.border};">${t.label_ref}</td><td align="right" style="padding: 12px 0; color: #fff; font-family: monospace; border-bottom: 1px solid ${THEME.border};">#${data.orderId}</td></tr>
                        <tr><td style="padding: 12px 0; color: ${THEME.textSecondary}; font-size: 13px; border-bottom: 1px solid ${THEME.border};">${t.label_ticket}</td><td align="right" style="padding: 12px 0; color: #fff; border-bottom: 1px solid ${THEME.border};">${data.ticketType}</td></tr>
                        <tr><td style="padding: 12px 0; color: ${THEME.textSecondary}; font-size: 13px; border-bottom: 1px solid ${THEME.border};">${t.label_date}</td><td align="right" style="padding: 12px 0; color: #fff; border-bottom: 1px solid ${THEME.border};">${data.date} | ${data.time}</td></tr>
                        <tr><td style="padding: 12px 0; color: ${THEME.textSecondary}; font-size: 13px; border-bottom: 1px solid ${THEME.border};">${t.label_guests}</td><td align="right" style="padding: 12px 0; color: #fff; border-bottom: 1px solid ${THEME.border};">${data.adults} ${t.label_adults} ${data.reduced > 0 ? `, ${data.reduced} ${t.label_reduced}` : ''}</td></tr>
                        <tr><td style="padding: 15px 0; color: ${THEME.gold}; font-weight: bold; font-size: 13px;">${t.label_total}</td><td align="right" style="padding: 15px 0; color: ${THEME.gold}; font-size: 20px; font-weight: bold;">€${data.total.toFixed(2)}</td></tr>
                    </table>

                    <div style="background-color: #1a1a1a; padding: 25px; border-radius: 8px;">
                        <div style="font-size: 14px; font-weight: bold; color: #fff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">${t.section_faq}</div>
                        <div style="margin-bottom: 15px;">
                            <div style="color: ${THEME.gold}; font-size: 13px; font-weight: bold; margin-bottom: 5px;">${t.faq_1_q}</div>
                            <div style="color: ${THEME.textSecondary}; font-size: 13px; line-height: 1.5;">${t.faq_1_a}</div>
                        </div>
                        <div>
                            <div style="color: ${THEME.gold}; font-size: 13px; font-weight: bold; margin-bottom: 5px;">${t.faq_2_q}</div>
                            <div style="color: ${THEME.textSecondary}; font-size: 13px; line-height: 1.5;">${t.faq_2_a}</div>
                        </div>
                    </div>

                </td>
            </tr>

            <tr>
                <td align="center" style="background-color: #050505; padding: 30px; border-top: 1px solid ${THEME.border};">
                    <p style="margin: 0 0 10px 0; color: ${THEME.textSecondary}; font-size: 12px;">${t.footer_text}</p>
                    <p style="margin: 0; color: #555; font-size: 11px;">
                        ${t.footer_contact} <a href="mailto:info@accesstoitaly.com" style="color: ${THEME.gold}; text-decoration: none;">info@accesstoitaly.com</a>
                    </p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
  `;
};

// 2. GENERATE TICKET EMAIL
export const generateTicketEmailHtml = (data: OrderDetails, locale: string = 'en') => {
  const t = ticketTranslations[locale] || ticketTranslations['en'];
  const heroSubtitleParsed = t.hero_subtitle.replace('{{name}}', data.customerName.split(' ')[0]);

  return `
<!DOCTYPE html>
<html lang="${locale}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.subject}</title>
    <style>
        body { margin: 0; padding: 0; background-color: ${THEME.bg}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: ${THEME.textPrimary}; }
        table { border-spacing: 0; border-collapse: collapse; }
        td { padding: 0; }
        a { text-decoration: none; color: inherit; }
        .wrapper { width: 100%; table-layout: fixed; background-color: ${THEME.bg}; padding-bottom: 40px; }
        .main-container { margin: 0 auto; max-width: 600px; background-color: ${THEME.cardBg}; border: 1px solid ${THEME.border}; border-radius: 8px; overflow: hidden; }
        @media screen and (max-width: 600px) { .main-container { width: 100% !important; border: none !important; border-radius: 0 !important; } .content-pad { padding: 30px 20px !important; } }
    </style>
</head>
<body>
    <center class="wrapper">
        <table class="main-container" width="100%">
            <tr>
                <td align="center" style="padding: 40px 0 35px 0; border-bottom: 1px solid ${THEME.border}; background-color: #050505;">
                    <span style="font-family: 'Times New Roman', serif; font-size: 22px; letter-spacing: 5px; color: #ffffff; text-transform: uppercase;">
                        ACCESS<span style="color: ${THEME.gold};">TO</span>ITALY
                    </span>
                </td>
            </tr>

            <tr>
                <td class="content-pad" style="padding: 50px 40px;">
                    
                    <table width="100%">
                        <tr>
                            <td align="center" style="padding-bottom: 20px;">
                                <div style="width: 60px; height: 60px; border-radius: 50%; background-color: rgba(212, 175, 55, 0.1); display: flex; align-items: center; justify-content: center; line-height: 60px;">
                                    <span style="font-size: 30px; color: ${THEME.gold};">★</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-family: 'Times New Roman', serif; font-size: 26px; color: ${THEME.gold}; padding-bottom: 15px; font-weight: 500;">
                                ${t.hero_title}
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="font-size: 15px; line-height: 26px; color: ${THEME.textSecondary}; padding-bottom: 45px; max-width: 80%; margin: 0 auto;">
                                ${heroSubtitleParsed}
                            </td>
                        </tr>
                    </table>

                    <table width="100%" style="background-color: #1a1a1a; border-left: 3px solid ${THEME.gold}; border-radius: 4px; margin-bottom: 45px;">
                        <tr>
                            <td style="padding: 25px;">
                                <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: ${THEME.gold}; margin-bottom: 10px; letter-spacing: 1.5px;">
                                    ${t.instruction_title}
                                </div>
                                <div style="font-size: 14px; line-height: 24px; color: #d4d4d4;">
                                    ${t.instruction_text}
                                </div>
                            </td>
                        </tr>
                    </table>

                    <div style="border: 1px solid ${THEME.border}; border-radius: 8px; margin-bottom: 45px; overflow: hidden;">
                        <div style="background-color: #1f1f1f; padding: 12px 25px; border-bottom: 1px solid ${THEME.border}; display: flex; justify-content: space-between;">
                            <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: ${THEME.textSecondary};">${t.guest_card_title}</span>
                            <span style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #fff;">#${data.orderId}</span>
                        </div>
                        <div style="padding: 25px;">
                            <div style="font-size: 18px; color: #fff; font-weight: 500; margin-bottom: 20px;">${data.customerName}</div>
                            <div style="display: flex; gap: 20px;">
                                <div>
                                    <div style="font-size: 10px; color: ${THEME.textSecondary}; text-transform: uppercase; margin-bottom: 4px;">Experience</div>
                                    <div style="font-size: 14px; color: #fff;">${data.ticketType}</div>
                                </div>
                            </div>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #222;">
                                <div style="font-size: 10px; color: ${THEME.textSecondary}; text-transform: uppercase; margin-bottom: 4px;">Date & Time</div>
                                <div style="font-size: 14px; color: ${THEME.gold}; font-weight: bold;">${data.date} @ ${data.time}</div>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center; border-top: 1px solid ${THEME.border}; padding-top: 35px;">
                        <div style="font-family: 'Times New Roman', serif; font-size: 18px; color: #fff; margin-bottom: 20px;">${t.important_info_title}</div>
                        
                        <div style="font-size: 13px; color: ${THEME.textSecondary}; margin-bottom: 12px;">
                            <span style="color: ${THEME.gold}; font-weight: bold; margin-right: 8px;">•</span> ${t.info_1}
                        </div>
                        <div style="font-size: 13px; color: ${THEME.textSecondary}; margin-bottom: 12px;">
                            <span style="color: ${THEME.gold}; font-weight: bold; margin-right: 8px;">•</span> ${t.info_2}
                        </div>
                        <div style="font-size: 13px; color: ${THEME.textSecondary};">
                            <span style="color: ${THEME.gold}; font-weight: bold; margin-right: 8px;">•</span> ${t.info_3}
                        </div>
                    </div>

                </td>
            </tr>

            <tr>
                <td align="center" style="background-color: #050505; padding: 30px; border-top: 1px solid ${THEME.border};">
                    <p style="margin: 0 0 10px 0; color: ${THEME.textSecondary}; font-size: 12px;">${t.footer_text}</p>
                    <p style="margin: 0; color: #555; font-size: 11px;">
                        ${t.footer_contact} <a href="mailto:info@accesstoitaly.com" style="color: ${THEME.gold}; text-decoration: none;">info@accesstoitaly.com</a>
                    </p>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
  `;
};

// SUBJECT GETTERS
export const getEmailSubject = (locale: string = 'en') => {
    return (translations[locale] || translations['en']).subject;
};

export const getTicketEmailSubject = (locale: string = 'en') => {
    return (ticketTranslations[locale] || ticketTranslations['en']).subject;
};