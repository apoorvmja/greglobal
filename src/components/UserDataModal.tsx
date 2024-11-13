'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { db } from "@/firebase.config";
import { doc, setDoc } from "firebase/firestore"
import { FormEvent } from "react"
import { Heart } from "lucide-react"

interface UserDataModalProps {
  ExtractDataFromSessionStorage: boolean;
}

export function UserDataModal({ ExtractDataFromSessionStorage }: UserDataModalProps) {
  const { isLoaded, user } = useUser()
  const [GetDetailsModal, setgetDetailsModal] = useState(false)
  const [OurFreeServicesModal, setourFreeServicesModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    country: "",
    city: "",
  })
  const services = [
    "Support of Expert counselor",
    "100% Application Fee Waiver",
    "Application Material Support",
    "Application Check & Review",
    "SOP/LOR Support",
    "Scholarship Support",
    "Visa Support",
    "Education Loan Support",
    // "Receive a ₹10,000 Amazon Shopping Voucher when you complete your application process with us and secure your visa 🎁 "
  ]
  const [SubmittedSuccesfully, setsubmittedSuccesfully] = useState(false)
  const [isOverallModalOpen, setIsOverallModalOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      const clerkName = user.fullName || "";
      const clerkNumber = user.primaryPhoneNumber?.phoneNumber;

      const sessionData = sessionStorage.getItem("formData");
      const parsedSessionData = sessionData ? JSON.parse(sessionData) : {};
      const sessionNumber = parsedSessionData.number || "";

      // Set formData with clerk data or sessionStorage fallback
      setFormData((prevData) => ({
        ...prevData,
        name: clerkName,
        number: clerkNumber || sessionNumber || "",
      }));
    }
  }, [isLoaded, user]);
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      // If not logged in, store data in sessionStorage and redirect to login
      sessionStorage.setItem("formData", JSON.stringify(formData))
      // window.location.href = "https://coherent-killdeer-93.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Fmock-tests"
      window.location.href = "https://accounts.gregoglobal.com/sign-in?redirect_url=https%3A%2F%2Fgregoglobal.com%2Fmock-tests"
    }
    else {
      try {
        const userID = user.id
        await setDoc(doc(db, `tests/${userID}/userData/info`), formData)
        // console.log("User data successfully stored!")
        setsubmittedSuccesfully(true)
      } catch (error) {
        console.error("Error storing user data: ", error)
      }

      setourFreeServicesModal(false)
      setgetDetailsModal(false);
      setsubmittedSuccesfully(true);
      sessionStorage.removeItem("formData")
    }
  }

  useEffect(() => {
    if (ExtractDataFromSessionStorage) {
      const data = sessionStorage.getItem("formData")
      if (data) {
        setFormData(JSON.parse(data))
        setgetDetailsModal(true)
        setourFreeServicesModal(false)
        setsubmittedSuccesfully(false)
        setIsOverallModalOpen(true);
      }
    }
  }, [ExtractDataFromSessionStorage])


  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords

        // Fetch location data from OpenCage API
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3893b8bb90e34746be27ed250594421e`
        )
        const data = await response.json()

        if (data.results.length > 0) {
          const location = data.results[0].components
          setFormData((prevData) => ({
            ...prevData,
            country: location.country,
            city: location.city || location.town || location.village || "",
          }))
        }
      })
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  const playBeep = () => {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
    }, 300)
  }

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = []
    if (OurFreeServicesModal && !GetDetailsModal) {
      services.forEach((_, index) => {
        const timer = setTimeout(() => {
          playBeep()
        }, index * 1500)
        timers.push(timer)
      })
    }
    return () => {
      timers.forEach(clearTimeout)
      timers = []
    }
  }, [OurFreeServicesModal])


  return (
    <Dialog open={isOverallModalOpen} onOpenChange={setIsOverallModalOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold rounded-t-none" onClick={() => {
          setIsOverallModalOpen(true)
          if (!ExtractDataFromSessionStorage) { setourFreeServicesModal(true); setgetDetailsModal(false); setsubmittedSuccesfully(false) }
          if (ExtractDataFromSessionStorage) { setgetDetailsModal(true); setourFreeServicesModal(false); setsubmittedSuccesfully(false) }
        }}>
          Explore Our FREE Services (here) 😊
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[60%] w-[95%] h-[80%] sm:h-auto p-0 overflow-hidden border-none bg-none">
        <div className="h-full">
          <img
            src="https://img.freepik.com/free-photo/beautiful-tourist-woman-holding-travel-suitcase-passport-with-tickets-with-smile-face-happy-positive-travel-concept-standing-blue-space_141793-22043.jpg?t=st=1731497539~exp=1731501139~hmac=41fa5cd49bb54ce024accb5fa2840fa155d92619cdcced7b79b63ab741002695&w=826"
            alt="Student With Passort"
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center sm:justify-start p-2 sm:w-auto sm:p-5 bg-black/30 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-4 rounded-lg p-1 sm:p-4">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-black">HOLD ON</h2>
                <p className="text-sm text-black">Check out our free services and enquire today.</p>
                {GetDetailsModal && (
                  <div className="space-y-4">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="bg-white text-black"
                    />
                    <Input
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="bg-white text-black"
                    />
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      required
                      className="bg-white text-black"
                    />
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                      className="bg-white text-black"
                    />
                    <div className="flex sm:gap-0 gap-4 justify-between">
                      <Button type="submit" className="dark:border dark:border-black">
                        Enquire 😊
                      </Button>
                      <Button type="button" onClick={handleLocation} className="dark:border dark:border-black">
                        Autofill Location
                      </Button>
                    </div>
                  </div>
                )}
                {OurFreeServicesModal && (
                  <>
                    <div className="h-48 overflow-y-scroll">
                      {services.map((service, index) => (
                        <li
                          key={index}
                          className="opacity-0 animate-fade-in font-mono text-black"
                          style={{ animationDelay: `${index * 1.5}s`, backfaceVisibility: 'hidden' }}
                        >
                          {service.split(".").map((word, i) => (
                            <span
                              key={i}
                              className="inline-block opacity-0 animate-fade-in text-xs sm:text-base"
                              style={{ animationDelay: `${index * 0.3 + i * 0.05}s`, backfaceVisibility: 'hidden' }}
                            >
                              {word}{" "}
                            </span>
                          ))}
                        </li>
                      ))}
                    </div>
                    <Button className="mt-5 dark:border dark:border-black" onClick={() => { setourFreeServicesModal(!OurFreeServicesModal); setgetDetailsModal(!GetDetailsModal) }}>Enroll Now for FREE 😊</Button>
                    <style jsx>{`
                      @keyframes fadeIn {
                          from {
                            opacity: 0;
                          }
                          to {
                            opacity: 1;
                          }
                        }
                                          
                        .animate-fade-in {
                          animation: fadeIn 0.8s ease forwards;
                        }
                      `}</style>
                  </>
                )}
                {SubmittedSuccesfully && (
                  <>
                    <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                      <div className="my-4 relative">
                        <Heart className="w-16 h-16 mx-auto text-red-500 animate-bounce" />
                        <div className="absolute inset-0 text-red-500 animate-ping">
                          <Heart className="w-16 h-16 mx-auto" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                        Thank You!
                      </h2>
                      <p className="text-gray-600 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        We appreciate your valuable feedback
                      </p>
                      <Button
                        variant="link"
                        onClick={() => { window.location.href = "/mock-tests" }}
                        className="mt-6 animate-in fade-in duration-1000 delay-700"
                      >
                        Submit another response
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-900 hover:bg-transparent"
          onClick={() => { setIsOverallModalOpen(!isOverallModalOpen) }}
        >
          <span className="sr-only">Close</span>
        </Button>
      </DialogContent>
    </Dialog >
  )
}