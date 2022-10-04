package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class webViewActivity extends AppCompatActivity {

    WebView webView;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        String token = getSharedPreferences("MySharedPref", MODE_PRIVATE).getString("token", null);

        webView = (WebView) findViewById(R.id.webview);
        webView.setBackgroundColor(Color.BLACK);
        webView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.i("", "CLICK");
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView webView, String url) {
                setLocalStorageToken(token);
                fadeIn(webView);
            }

            public void onLoadResource(WebView view, String url) {
                String currentMenu = getEndpointFromUrl(view.getUrl());
                if (currentMenu.equals("dashboard")) {
                    view.loadUrl("");
                    backToDash();
                }
            }


        });
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webView.loadUrl(getIntent().getStringExtra("URL"));
    }

    private String getEndpointFromUrl(String url) {
        String[] uriElements = url.split("/");
        return uriElements[uriElements.length - 1];
    }

    private void backToDash() {
        Intent intent = new Intent(this, Dashboard.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }

    private void setLocalStorageToken(String token) {
        String setLocalStorageToken = "localStorage.setItem(\"token\", \"" + token + "\");";
        String setLocalStoragePlatform = "localStorage.setItem(\"platform\", \"android\");";
        //localStorage.setItem("token", res.data.token);
        webView.evaluateJavascript(setLocalStorageToken, null);
        webView.evaluateJavascript(setLocalStoragePlatform, null);
    }

    private void fadeIn(WebView webView) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new AccelerateInterpolator());
        fadeIn.setDuration(1000);

        fadeIn.setAnimationListener(new Animation.AnimationListener() {
            public void onAnimationEnd(Animation animation) {
                //imageView.setVisibility(View.GONE);
            }

            public void onAnimationRepeat(Animation animation) {
            }

            public void onAnimationStart(Animation animation) {
            }
        });

        webView.startAnimation(fadeIn);
    }
}