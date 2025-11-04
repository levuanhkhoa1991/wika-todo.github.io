"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Lock } from "lucide-react"

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  onError?: () => void
}

export function OTPInput({ length = 6, onComplete, onError }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const [focusIndex, setFocusIndex] = useState(0)
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const shakeRef = useRef<HTMLDivElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)
  const [showIcon, setShowIcon] = useState(true)

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
      setFocusIndex(index + 1)
    }

    // Check if complete
    if (newOtp.every((digit) => digit !== "")) {
      const fullOtp = newOtp.join("")
      // Simulate verification - change this to your actual verification logic
      const isCorrect = fullOtp === "123456" // Example: correct OTP is 123456

      if (isCorrect) {
        setStatus("success")
        onComplete?.(fullOtp)
      } else {
        setStatus("error")
        onError?.()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
      setFocusIndex(index - 1)
    }
  }

  const resetOtp = () => {
    setOtp(Array(length).fill(""))
    setStatus("idle")
    setShowIcon(true)
    inputRefs.current[0]?.focus()
    setFocusIndex(0)
  }

  useEffect(() => {
    if (status === "error") {
      const timer = setTimeout(resetOtp, 1500)
      return () => clearTimeout(timer)
    }
  }, [status])

  const highlightVariants = {
    initial: { x: 0, borderColor: "#3b82f6" },
    animate: {
      x: focusIndex * 64,
      borderColor: status === "error" ? "#ef4444" : "#3b82f6",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  const boxVariants = {
    idle: {
      y: 0,
      opacity: 1,
      x: 0,
    },
    shake: {
      x: [0, -8, 8, -8, 8, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const digitVariants = {
    initial: { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    bounce: {
      scale: [1, 1.3, 0.9, 1.15, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Icon Section */}
        <div className="flex justify-center mb-12">
          <motion.div
            className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
            animate={status === "success" ? "bounce" : "initial"}
            variants={iconVariants}
          >
            {status === "success" && !showIcon ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                <Lock size={48} className="text-white" />
              </motion.div>
            ) : (
              <Mail size={48} className="text-white" />
            )}
          </motion.div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Enter OTP</h1>
          <p className="text-slate-500">
            {status === "error"
              ? "Invalid OTP. Please try again."
              : status === "success"
                ? "OTP verified successfully!"
                : "Enter the 6-digit code sent to your email"}
          </p>
        </div>

        {/* OTP Input Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="relative">
            {/* Animated Highlight Border */}
            <motion.div
              ref={highlightRef}
              className="absolute top-0 w-16 h-16 border-2 border-blue-500 rounded-lg pointer-events-none"
              variants={highlightVariants}
              initial="initial"
              animate="animate"
            />

            {/* OTP Input Boxes */}
            <motion.div
              ref={shakeRef}
              className="grid grid-cols-6 gap-3 relative z-10"
              animate={status === "error" ? "shake" : "idle"}
              variants={boxVariants}
            >
              {otp.map((digit, index) => (
                <motion.div key={index} className="relative">
                  <input
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={() => setFocusIndex(index)}
                    className="w-full h-16 text-center text-2xl font-bold rounded-lg border-2 border-slate-200 focus:outline-none transition-colors"
                    disabled={status === "success"}
                  />
                  {/* Animated Digit */}
                  {digit && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-blue-600 pointer-events-none"
                      variants={digitVariants}
                      initial="initial"
                      animate="animate"
                      key={`${index}-${digit}`}
                    >
                      {digit}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Helper Text */}
          <p className="text-center text-sm text-slate-500 mt-8">
            {status === "error" ? (
              <span className="text-red-500 font-medium">Incorrect OTP. Resetting...</span>
            ) : status === "success" ? (
              <span className="text-green-500 font-medium">✓ Verified successfully</span>
            ) : (
              "Try: 123456"
            )}
          </p>

          {/* Reset Button (visible on success) */}
          {status === "success" && (
            <motion.button
              onClick={resetOtp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Try Again
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
