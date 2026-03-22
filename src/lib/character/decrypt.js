export async function decryptAndGetBlobUrl(filepath, password) {
  try {
    const response = await fetch(filepath);
    const encryptedBuffer = await response.arrayBuffer();
    
    // Derive key using SHA-256 of the password
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.digest('SHA-256', encoder.encode(password));
    const key = await crypto.subtle.importKey(
      'raw',
      keyMaterial,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );

    // The first 16 bytes of the file are the IV, the rest is the encrypted data
    const iv = new Uint8Array(encryptedBuffer, 0, 16);
    const data = new Uint8Array(encryptedBuffer, 16);
    
    // Decrypt
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-CBC', iv: iv },
      key,
      data
    );

    const blob = new Blob([decryptedBuffer], { type: 'model/gltf-binary' });
    const url = URL.createObjectURL(blob);
    
    return {
      url,
      revoke: () => URL.revokeObjectURL(url)
    };
  } catch (err) {
    console.error('[decrypt] Failed to decrypt character:', err);
    throw err;
  }
}
