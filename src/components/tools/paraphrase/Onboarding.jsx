"use client"
import { useEffect, useRef } from "react"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import './Onboarding.css'

export default function Onboarding() {
  const driverRef = useRef(null)
  const stepIndex = useRef(0)

  // Simple utility to wait for element to be properly positioned
  const waitForElementReady = (selector, timeout = 3000) => {
    return new Promise((resolve) => {
      const checkElement = () => {
        const element = document.querySelector(selector)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Check if element has proper dimensions and position
          if (rect.width > 0 && rect.height > 0) {
            resolve(element)
            return
          }
        }
        setTimeout(checkElement, 50)
      }
      checkElement()
      // Fallback timeout
      setTimeout(() => resolve(document.querySelector(selector)), timeout)
    })
  }

  const steps = [
    {
      element: "#sample-paste-section",
      popover: {
        description: 'Paste text or use "Try Sample"',
        side: "top",
      },
      onNext: () => clickAndNext("mode_more"),
    },
    {
      element: "#mode_more_section",
      popover: {
        description: "Click More to access additional styles",
        side: "top",
      },
      onNext: () => {
        clickElByID("mode_more")
        setTimeout(() => clickAndNext("language_all_button"), 300)
      },
    },
    {
      element: "#language_menu",
      popover: {
        description: "Choose from English, Bangla, Hindi…",
        side: "bottom",
      },
      onNext: () => clickAndNext("language_x_button"),
    },
    {
      element: "#paraphrase_settings",
      popover: {
        description: "Click the gear icon to open Settings",
        side: "bottom",
      },
      onNext: () => clickElByID("paraphrase_settings_button", true),
    },
    {
      element: "#settings_tab",
      popover: {
        description: "You can set 'Paraphrase Options' and 'Interface options' here",
        side: "top",
      },
      onNext: () => clickElByID("settings_sidebar_x_button", true),
      onPrevious: () => {
        // Close settings tab first, then go to previous step
        clickElByID("settings_sidebar_x_button")
        setTimeout(() => highlightStep(stepIndex.current - 1), 300)
      },
    },
    {
      element: "#paraphrase_feedback",
      popover: {
        description: "Click the Feedback icon",
        side: "bottom",
      },
      onNext: () => clickAndNext("paraphrase_feedback_button"),
      onPrevious: () => {
        clickElByID("paraphrase_settings_button")
        setTimeout(()=>highlightStep(stepIndex.current - 1),300)
      }
    },
    {
      element: "#feedback_tab",
      popover: {
        description: "Give service reviews or suggestions",
        side: "top",
      },
      onPrevious: () => {
        // Close feedback tab first, then go to previous step
        clickElByID("settings_sidebar_x_button")
        setTimeout(() => highlightStep(stepIndex.current - 1), 300)
      },
      // no onNext — this is the last step
    },
  ]

  useEffect(() => {
    driverRef.current = driver({
      popoverClass: "driverjs-theme",
      stagePadding: 4,
      smoothScroll: true,
      allowClose: false,
    })
    highlightStep(0)   // start the tour
  }, [])

  function clickElByID(id, moveNext = false) {
    const el = document.getElementById(id)
    if (el) el.click()
    if (moveNext) {
      // give UI time to update
      setTimeout(() => highlightStep(stepIndex.current + 1), 300)
    }
  }

  function clickAndNext(id) {
    clickElByID(id)
    // extra delay before moving on
    setTimeout(() => highlightStep(stepIndex.current + 1), 300)
  }

  async function highlightStep(idx) {
    if (idx < 0 || idx > steps.length - 1) return
    stepIndex.current = idx
    const isLast = idx === steps.length - 1
    const { element, popover, onNext, onPrevious } = steps[idx]
    
    // Wait for element to be properly positioned before highlighting
    await waitForElementReady(element)
    
    const btns = isLast
      ? ["previous", "close"]
      : ["previous", "next"]
    
    driverRef.current.highlight({
      element,
      popover: {
        ...popover,
        showButtons: btns,
        // rename the close button on the last step:
        ...(isLast && { doneBtnText: "Done" }),
        // wire up the Next button:
        onNextClick: (el, step, opts) => {
          opts.driver.refresh()
          onNext && onNext(el, step, opts)
        },
        // wire up the Previous button:
        onPrevClick: (el, step, opts) => {
          opts.driver.refresh()
          // Check if this step has a custom onPrevious handler
          if (onPrevious) {
            onPrevious(el, step, opts)
          } else {
            // Default behavior: go to previous step with a small delay
            setTimeout(() => highlightStep(idx - 1), 150)
          }
        },
        // wire up the Close/Done button:
        onCloseClick: (el, step, opts) => {
          opts.driver.destroy()
        },
      },
    })
  }

  return null
}
