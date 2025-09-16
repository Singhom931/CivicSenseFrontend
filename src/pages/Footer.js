import React from 'react'

function Footer(){
  return (
    <div>
        <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    
    <div>
      <h2 class="text-2xl font-bold">CivicSense</h2>
      <p class="mt-2 text-sm text-black">
        Join with our inititive and be among the responsible citizeon of india
      </p>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
      <ul class="space-y-2">
        <li classname="hover:underline">Dashboard</li>
        <li classname="hover:underline">Join Event</li>
        <li classname="hover:underline">Organize Events</li>
      </ul>
    </div>

 
    <div>
      <h3 class="text-lg font-semibold mb-3">Contact</h3>
      <p>Email: <a href="mailto:info@civicSense.org" class="hover:underline">info@civicSense.org</a></p>
      <p>Phone: +91 98765 43210</p>
      
    </div>
  </div>

  <div class="mt-8 border-t border-blue-300 pt-4 text-center text-sm text-black">
    © 2025 CivicSense. All rights reserved.
  </div>
    </div>
  )
}

export default Footer