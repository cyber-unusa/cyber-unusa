//! Konstanta warna biar konsisten
const COLORS = {
  primary: "#10B981", // Emerald Green (Sesuai tema Cyber)
  background: "#1e293b", // Slate 800 (Dark Mode)
  text: "#ffffff",
  textSecondary: "#94a3b8",
};

const HEAD_STYLE = `
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: ${COLORS.background};
  margin: 0;
  padding: 0;
  width: 100%;
`;

const CONTAINER_STYLE = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #0f172a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid #334155;
`;

//? Template Verifikasi Email (OTP)
export const EMAIL_VERIFY_TEMPLATE = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verifikasi Email</title>
    </head>
    <body style="${HEAD_STYLE}">
      <div style="padding: 40px 20px;">
        <div style="${CONTAINER_STYLE}">
          
          <div style="background-color: #020617; padding: 20px; text-align: center; border-bottom: 1px solid #334155;">
            <h2 style="color: ${COLORS.primary}; margin: 0; letter-spacing: 2px;">CYBER UNUSA</h2>
          </div>

          <div style="padding: 30px; text-align: center;">
            <h1 style="color: ${COLORS.text}; font-size: 24px; margin-bottom: 10px;">Verifikasi Akun Anda</h1>
            <p style="color: ${COLORS.textSecondary}; font-size: 16px; margin-bottom: 30px;">
              Terima kasih telah mendaftar! Gunakan kode di bawah ini untuk memverifikasi akun email Anda.
            </p>

            <div style="background-color: #1e293b; border: 1px dashed ${COLORS.primary}; padding: 15px; display: inline-block; border-radius: 8px; margin-bottom: 30px;">
              <span style="color: ${COLORS.primary}; font-size: 32px; font-weight: bold; letter-spacing: 5px;">${otp}</span>
            </div>

            <p style="color: ${COLORS.textSecondary}; font-size: 14px;">
              Kode ini akan kadaluarsa dalam 24 jam.<br>
              Jika Anda tidak meminta kode ini, abaikan saja email ini.
            </p>
          </div>

          <div style="background-color: #020617; padding: 20px; text-align: center; border-top: 1px solid #334155;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} Cyber Unusa. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

//? Template Selamat Datang (Welcome)
export const WELCOME_TEMPLATE = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <body style="${HEAD_STYLE}">
      <div style="padding: 40px 20px;">
        <div style="${CONTAINER_STYLE}">
          <div style="background-color: #020617; padding: 20px; text-align: center; border-bottom: 1px solid #334155;">
            <h2 style="color: ${COLORS.primary}; margin: 0; letter-spacing: 2px;">CYBER UNUSA</h2>
          </div>
          <div style="padding: 30px; text-align: center;">
            <h1 style="color: ${COLORS.text}; margin-bottom: 20px;">Selamat Datang, ${name}! 🚀</h1>
            <p style="color: ${COLORS.textSecondary}; font-size: 16px; line-height: 1.6;">
              Selamat bergabung di komunitas Cyber Unusa. Akun Anda telah berhasil dibuat.<br>
              Jelajahi fitur-fitur menarik dan mari belajar bersama!
            </p>
            <a href="${process.env.CLIENT_URL || "#"}" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: ${COLORS.primary}; color: #020617; text-decoration: none; font-weight: bold; border-radius: 5px;">
              Masuk ke Dashboard
            </a>
          </div>
          <div style="background-color: #020617; padding: 20px; text-align: center; border-top: 1px solid #334155;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Cyber Unusa.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

//? Template Reset Password (OTP)
export const PASSWORD_RESET_TEMPLATE = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <body style="${HEAD_STYLE}">
      <div style="padding: 40px 20px;">
        <div style="${CONTAINER_STYLE}">
          <div style="background-color: #020617; padding: 20px; text-align: center; border-bottom: 1px solid #334155;">
            <h2 style="color: ${COLORS.primary}; margin: 0; letter-spacing: 2px;">CYBER UNUSA</h2>
          </div>
          <div style="padding: 30px; text-align: center;">
            <h1 style="color: ${COLORS.text}; font-size: 22px; margin-bottom: 10px;">Permintaan Reset Password</h1>
            <p style="color: ${COLORS.textSecondary}; font-size: 16px;">
              Seseorang (semoga Anda) telah meminta untuk mereset password akun Cyber Unusa Anda.
            </p>
            
            <div style="margin: 30px 0;">
              <span style="background-color: #ef4444; color: white; padding: 10px 20px; font-size: 28px; font-weight: bold; border-radius: 6px; letter-spacing: 4px;">
                ${otp}
              </span>
            </div>

            <p style="color: ${COLORS.textSecondary}; font-size: 14px;">
              Jangan berikan kode ini kepada siapapun.<br>
              Jika Anda tidak merasa melakukan ini, amankan akun Anda segera.
            </p>
          </div>
           <div style="background-color: #020617; padding: 20px; text-align: center; border-top: 1px solid #334155;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">&copy; ${new Date().getFullYear()} Cyber Unusa Security Team.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
