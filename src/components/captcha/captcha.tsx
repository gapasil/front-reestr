import React, { FC, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const Captcha: FC<{
  remove: boolean;
  cb: (value: null | string) => void;
}> = ({ remove, cb }) => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for CAPTCHA
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  useEffect(() => {
    setCaptchaValue(null);
    captchaRef.current?.reset();
  }, [remove]);

  useEffect(() => {
    cb(captchaValue);
  }, [captchaValue, cb]);

  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '';

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value); // Set the CAPTCHA value
  };
  return (
    <div style={{ maxWidth: '100%', marginTop: '10px', marginBottom: '10px' }}>
      <ReCAPTCHA
        style={{ maxWidth: '100%' }}
        sitekey={key}
        onChange={handleCaptchaChange}
        ref={captchaRef}
      />
    </div>
  );
};
