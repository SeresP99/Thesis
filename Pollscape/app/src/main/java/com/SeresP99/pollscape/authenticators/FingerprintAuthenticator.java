package com.SeresP99.pollscape.authenticators;

import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.SeresP99.pollscape.VoteActivity;

import java.util.concurrent.Executor;

public class FingerprintAuthenticator {

    Context context;

    boolean AuthSuccess;
    int pollId;

    public boolean isAuthSuccess() {
        return AuthSuccess;
    }

    public FingerprintAuthenticator(Context context, int pollId) {
        this.context = context;
        this.pollId = pollId;
    }

    public void authenticate(){

        BiometricManager biometricManager = BiometricManager.from(context);

        switch (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_STRONG)) {
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                Toast("Sorry, your device doesn't support fingerprint features.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                Toast("Error: Fingerprint sensor is currently unavailable.");
                break;
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                Toast("No fingerprint assigned.");
            case BiometricManager.BIOMETRIC_ERROR_SECURITY_UPDATE_REQUIRED:
                break;
            case BiometricManager.BIOMETRIC_ERROR_UNSUPPORTED:
                break;
            case BiometricManager.BIOMETRIC_STATUS_UNKNOWN:
                break;
            case BiometricManager.BIOMETRIC_SUCCESS:
                break;
        }

        Executor executor = ContextCompat.getMainExecutor(context);
        BiometricPrompt biometricPrompt = new BiometricPrompt((FragmentActivity) context, executor, new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                AuthSuccess = false;
            }

            @Override
            public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                AuthSuccess = true;
                Intent intent = new Intent(context, VoteActivity.class);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                intent.putExtra("FINGERPRINT_AUTH_KEY","d1pqDLXYgkOmLcR7OJGjV8KmWu0ExSQOBI1aJvFEYy2W6NRWQ8");
                intent.putExtra("POLL_ID", pollId);
                context.startActivity(intent);
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                AuthSuccess = false;
            }
        });

        BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Vote Authentication")
                .setDescription("Use your fingerprint before voting.")
                .setAllowedAuthenticators(BiometricManager.Authenticators.BIOMETRIC_STRONG)
                .setDeviceCredentialAllowed(false)
                .setNegativeButtonText("Cancel")
                .build();

        biometricPrompt.authenticate(promptInfo);
    }

    private void Toast(String text) {
        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
    }
}
