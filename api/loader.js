
// /api/loader.js
// PixelHub Dynamic Loader - Generated 2025-06-21T13:40:07.781Z
// Active Pixels: meta:1288677251976913

const PIXEL_CONFIGS = [
  {
    "id": "6856af8610b0f6c1ce7a7bbe",
    "name": "FreeTV pixel",
    "pixel_id": "1288677251976913",
    "pixel_type": "meta",
    "is_active": true,
    "trigger_conditions": [
      {
        "trigger_type": "page_load",
        "selector": "",
        "value": "",
        "event_name": "PageView",
        "ecommerce_data": {
          "currency": "USD",
          "value_selector": null,
          "transaction_id_selector": null,
          "static_value": null
        }
      }
    ],
    "advanced_settings": {
      "ga4_settings": {
        "measurement_id": null,
        "enhanced_ecommerce": true,
        "custom_dimensions": []
      },
      "meta_settings": {
        "test_events": false,
        "advanced_matching": true
      },
      "google_ads_settings": {
        "conversion_label": "",
        "remarketing": true
      }
    }
  }
];

export default function handler(request, response) {
  console.log('PixelHub Loader called with', PIXEL_CONFIGS.length, 'pixels');
  
  // Generate pixel injection code
  const pixelScripts = PIXEL_CONFIGS.map(pixel => {
    console.log('Processing pixel:', pixel.pixel_type, pixel.pixel_id);
    
    switch (pixel.pixel_type) {
      case 'meta':
        return `
          // Meta Pixel: ${pixel.pixel_id} (${pixel.name})
          console.log('🟢 PixelHub: Initializing Meta Pixel ${pixel.pixel_id}');
          
          // 1. Ensure the fbq function is initialized
          if (typeof window.fbq !== 'function') {
            !function(f,b,e,v,n,t,s) {
              if(f.fbq) return; 
              n=f.fbq=function(){
                n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
              };
              if(!f._fbq) f._fbq=n; 
              n.push=n; n.loaded=!0; n.version='2.0';
              n.queue=[]; 
              t=b.createElement(e); t.async=!0;
              t.src=v; 
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script', 'https://connect.facebook.net/en_US/fbevents.js');
            console.log('   - FBQ base script loaded.');
          } else {
            console.log('   - FBQ base script already exists.');
          }
          
          // 2. Initialize THIS specific pixel
          window.fbq('init', '${pixel.pixel_id}');
          console.log('   - fbq("init", "${pixel.pixel_id}") called.');

          // 3. Track the standard PageView event for this pixel
          window.fbq('track', 'PageView');
          console.log('   - fbq("track", "PageView") called.');
          
          console.log('✅ Meta Pixel ${pixel.pixel_id} initialized successfully.');
        `;
        
      case 'google_analytics':
        return `
          // Google Analytics 4: ${pixel.pixel_id} (${pixel.name})
          console.log('🟢 PixelHub: Injecting GA4 ${pixel.pixel_id}');
          
          // Load gtag script
          const gaScript = document.createElement('script');
          gaScript.async = true;
          gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${pixel.pixel_id}';
          document.head.appendChild(gaScript);
          
          // Initialize dataLayer and gtag
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${pixel.pixel_id}');
          
          console.log('✅ GA4 ${pixel.pixel_id} initialized');
        `;
        
      case 'google_ads':
        return `
          // Google Ads: ${pixel.pixel_id} (${pixel.name})
          console.log('🟢 PixelHub: Injecting Google Ads ${pixel.pixel_id}');
          
          // Load gtag script if not already loaded
          if (!window.gtag) {
            const gtagScript = document.createElement('script');
            gtagScript.async = true;
            gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=${pixel.pixel_id}';
            document.head.appendChild(gtagScript);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
          }
          
          gtag('js', new Date());
          gtag('config', '${pixel.pixel_id}');
          
          console.log('✅ Google Ads ${pixel.pixel_id} initialized');
        `;
        
      case 'tiktok':
        return `
          // TikTok Pixel: ${pixel.pixel_id} (${pixel.name})
          console.log('🟢 PixelHub: Injecting TikTok Pixel ${pixel.pixel_id}');
          
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;
            var ttq=w[t]=w[t]||[];
            ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
            ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
            for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
            ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
            ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
            var o=document.createElement("script");
            o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
            var a=document.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(o,a)};
            ttq.load('${pixel.pixel_id}');
            ttq.page();
          }(window, document, 'ttq');
          
          console.log('✅ TikTok Pixel ${pixel.pixel_id} initialized');
        `;
        
      default:
        return `
          console.warn('⚠️ PixelHub: Unknown pixel type ${pixel.pixel_type} for pixel ${pixel.pixel_id}');
        `;
    }
  }).filter(Boolean);

  const fullScript = `
    (function() {
      console.log('🚀 PixelHub Loader Started - v1.0');
      console.log('📊 Loading ${PIXEL_CONFIGS.length} pixels:', PIXEL_CONFIGS.map(p => p.pixel_type + ':' + p.pixel_id));
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPixels);
      } else {
        initPixels();
      }
      
      function initPixels() {
        try {
          ${pixelScripts.join('\n\n')}
          
          console.log('✅ PixelHub: All pixels loaded successfully');
          window.PixelHubLoaded = true;
        } catch (error) {
          console.error('❌ PixelHub Error:', error);
        }
      }
    })();
  `;

  response.setHeader('Content-Type', 'application/javascript');
  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.status(200).send(fullScript);
}
