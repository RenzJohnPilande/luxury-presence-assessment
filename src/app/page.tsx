"use client"
import Link from "next/link"
import { HiChevronLeft, HiChevronRight, HiMenu, HiOutlineChat, HiSearch, HiX } from "react-icons/hi"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export default function Home() {
  const [open, setOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"

    // Set up intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const emblems = [
    {
      name: "the ridge realty group",
      image: "/images/ridge.webp",
    },
    {
      name: "equal housing opportunity",
      image: "/images/equalhousing.webp",
    },
    {
      name: "realtor",
      image: "/images/realtor.webp",
    },
    {
      name: "pahrump valley",
      image: "/images/pahrump.webp",
    },
  ]

  const whyChooseUs = [
    {
      title: "Top Residential Sales in the Last 5 Years",
      description:
        "We proudly assisted nearly 90 clients in 2021 alone, closing over $28.5 million in sales. Our track record reflects our commitment to results and client satisfaction year after year.",
      image: "/images/marketing1.webp",
    },
    {
      title: "Don't Just List It… Get It SOLD",
      description:
        "We go far beyond simply listing your property. From strategic marketing to maximum visibility, we put your home in front of the right buyers — fast. Our goal: top dollar, fewer days on market.",
      image: "/images/marketing2.webp",
    },
    {
      title: "Guide for Buyers",
      description:
        "Buying a home can be overwhelming — but not with us by your side. We offer in-depth market insights, curated upgrade recommendations, trusted contractor connections, and everything else you need to make confident, informed decisions.",
      image: "/images/marketing3.webp",
    },
  ]

  const listings = [
    {
      location: "Calvada Valley",
      type: "Single Family Home",
      bedrooms: 3,
      baths: 2,
      price: 325000,
    },
    {
      location: "Desert Greens",
      type: "Manufactured Home",
      bedrooms: 2,
      baths: 2,
      price: 185000,
    },
    {
      location: "Mount Charleston Estates",
      type: "Single Family Home",
      bedrooms: 4,
      baths: 3,
      price: 425000,
    },
    {
      location: "Pahrump Valley",
      type: "Ranch Style Home",
      bedrooms: 3,
      baths: 2,
      price: 295000,
    },
    {
      location: "Winery Estates",
      type: "Single Family Home",
      bedrooms: 5,
      baths: 4,
      price: 550000,
    },
    {
      location: "Artesia at Hafen Ranch",
      type: "Single Family Home",
      bedrooms: 3,
      baths: 2.5,
      price: 375000,
    },
    {
      location: "Comstock Park",
      type: "Townhome",
      bedrooms: 2,
      baths: 2,
      price: 210000,
    },
  ]

  const carouselData = [
    {
      src: "/images/gallery1.webp",
    },
    {
      src: "/images/gallery2.webp",
    },
    {
      src: "/images/gallery3.webp",
    },
    {
      src: "/images/gallery4.webp",
    },
    {
      src: "/images/gallery5.webp",
    },
    {
      src: "/images/gallery6.webp",
    },
    {
      src: "/images/gallery7.webp",
    },
  ]

  const services = [
    {
      title: "Real Estate Done Right",
      description:
        "Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
      image: "/images/services1.webp",
    },
    {
      title: "Commercial & Residential",
      description:
        "Large or small, condo or mansion, we can find it and get at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put you hard-earned dollars.",
      image: "/images/services2.webp",
    },
    {
      title: "Rely on Expertise",
      description:
        "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.",
      image: "/images/services3.webp",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    type: "",
    bedrooms: "",
    baths: "",
    minPrice: "",
    maxPrice: "",
  })
  const [hasSearched, setHasSearched] = useState(false)
  const [sortBy, setSortBy] = useState("price-low")
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? whyChooseUs.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === whyChooseUs.length - 1 ? 0 : prev + 1))
  }

  const handleSearch = () => {
    setHasSearched(true)
  }

  const handleNavClick = () => {
    setOpen(false)
  }

  const propertyTypes = [...new Set(listings.map((l) => l.type))]
  const locations = [...new Set(listings.map((l) => l.location))]

  const filteredListings = listings.filter((listing) => {
    const locationMatch = !searchFilters.location || listing.location === searchFilters.location
    const typeMatch = !searchFilters.type || listing.type === searchFilters.type
    const bedroomMatch = !searchFilters.bedrooms || listing.bedrooms >= Number.parseInt(searchFilters.bedrooms)
    const bathMatch = !searchFilters.baths || listing.baths >= Number.parseInt(searchFilters.baths)
    const minPriceMatch = !searchFilters.minPrice || listing.price >= Number.parseInt(searchFilters.minPrice)
    const maxPriceMatch = !searchFilters.maxPrice || listing.price <= Number.parseInt(searchFilters.maxPrice)

    return locationMatch && typeMatch && bedroomMatch && bathMatch && minPriceMatch && maxPriceMatch
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "bedrooms":
        return b.bedrooms - a.bedrooms
      case "newest":
        return 0
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-wrap w-full justify-center">
      <div className="flex flex-col items-center grow w-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex md:hidden absolute right-4 top-8 md:right-4 z-200 p-1 rounded-full border border-foreground cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150">
            <HiMenu className="text-sm" />
          </SheetTrigger>
          <SheetContent className="z-300">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center w-full p-5">
                  <img src="/images/logo.webp" alt="marci_metzger_homes_logo" />
                </div>
              </SheetTitle>
              <div className="flex flex-col items-center gap-10 uppercase tracking-widest pt-40 text-lg text-muted-foreground">
                <Link href="#home" className="hover:text-primary transition-colors" onClick={handleNavClick}>
                  Home
                </Link>
                <Link href="#profile" className="hover:text-primary transition-colors" onClick={handleNavClick}>
                  About Us
                </Link>
                <Link href="#listings" className="hover:text-primary transition-colors" onClick={handleNavClick}>
                  Listings
                </Link>
                <Link
                  href="#contact"
                  className="flex w-fit items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                  onClick={handleNavClick}
                >
                  <HiOutlineChat className="text-2xl" /> Let&apos;s Talk
                </Link>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <section id="home" className="flex justify-center relative w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero_banner.webp')",
              opacity: 0.85,
            }}
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="flex items-center mt-4 flex-col w-full md:max-w-6xl relative z-10 min-h-screen">
            <div className="flex justify-center w-full max-w-[200px] md:max-w-[300px]">
              <img src="/images/logo.webp" alt="marci_metzger_homes_logo" />
            </div>
            <div className="hidden md:flex flex-wrap gap-2 justify-between w-full max-w-xl text-center items-center uppercase text-sm font-semibold tracking-widest mt-2">
              <Link
                href="#home"
                className="transition duration-150 underline-offset-4 hover:text-accent hover:underline"
              >
                Home
              </Link>

              <Link
                href="#profile"
                className="transition duration-150 underline-offset-4 hover:text-accent hover:underline"
              >
                About Us
              </Link>

              <Link
                href="#listings"
                className="transition duration-150 underline-offset-4 hover:text-accent hover:underline"
              >
                Listings
              </Link>

              <Link
                href="#contact"
                className="transition duration-150 underline-offset-4 hover:text-accent hover:underline"
              >
                contact Us
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center text-center grow gap-4 text-white">
              <p className="text-base md:text-xl lg:text-2xl uppercase tracking-wide">
                MARCI METZGER - THE RIDGE REALTY GROUP
              </p>
              <p className="font-serif text-5xl md:text-6xl lg:text-8xl capitalize font-bold">Pahrump Realtor</p>
              <div className="py-10">
                <Link
                  href="#contact"
                  className="flex w-fit transition-all duration-300 items-center gap-2 px-6 py-3 shadow-lg bg-primary text-primary-foreground rounded-full uppercase text-sm font-semibold tracking-widest hover:bg-primary/90 hover:shadow-xl"
                >
                  <HiOutlineChat className="text-2xl" /> Let&apos;s Talk
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="profile"
          className={`flex justify-center relative w-full overflow-hidden bg-background transition-all duration-1000 ${visibleSections.has("profile") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="flex flex-col justify-center space-y-8 text-center md:text-start order-2 md:order-1">
                  <div className="space-y-4">
                    <p className="text-xs md:text-sm font-semibold text-primary uppercase tracking-widest">
                      Your Local Expert in Pahrump Real Estate
                    </p>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
                      MARCI METZGER
                    </h1>
                    <p className="text-xl md:text-2xl font-semibold text-primary">The Ridge Realty Group</p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      Marci was a REALTOR, then licensed Broker, in Washington State. Now, she is enjoying the sunshine,
                      and helping clients in Southern Nevada. Having helped buyers and sellers in many markets since
                      1995, she is a wealth of knowledge.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                    >
                      <HiOutlineChat className="text-xl" /> Get In Touch
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-8  order-1 md:order-2">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl" />
                    <div className="relative rounded-2xl overflow-hidden">
                      <img
                        src="/images/profile.png"
                        alt="Profile Image of Marci Metzger"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 md:p-8 space-y-3">
                    <svg className="w-8 h-8 text-primary opacity-40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5s-7 3.75-7 5c0 6 0 7 7 8z" />
                    </svg>
                    <p className="text-base md:text-lg font-medium text-foreground italic leading-relaxed">
                      &quot;I love that small-town feeling our community offers. Whether you&apos;re working, retired,
                      fast-paced or ready to relax — there&apos;s a place for you here.&quot;
                    </p>
                    <p className="text-sm font-semibold text-primary">— Marci Metzger</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="why-choose-us"
          className={`px-6 py-30 bg-background text-foreground w-full transition-all duration-1000 ${visibleSections.has("why-choose-us") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl">
              <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">Why Choose Us</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Discover what sets us apart in the real estate market
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col items-center justify-center order-2 lg:order-1">
                  <div className="relative w-full max-w-lg h-70 md:h-90 rounded-xl overflow-hidden shadow-xl mb-6 border-4 border-primary/20">
                    <Image
                      src={whyChooseUs[currentIndex].image || "/placeholder.svg"}
                      alt={whyChooseUs[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                      aria-label="Previous image"
                    >
                      <HiChevronLeft size={20} />
                    </button>

                    <div className="flex gap-2">
                      {whyChooseUs.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentIndex ? "bg-primary w-8" : "bg-muted"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                      aria-label="Next image"
                    >
                      <HiChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 space-y-8">
                  <ul className="space-y-6">
                    {whyChooseUs.map((item, index) => (
                      <li key={index} className="flex gap-4 group">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="listings" className="relative flex justify-center w-full overflow-hidden py-30">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/listings.webp')",
              opacity: 0.85,
            }}
          />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-6 py-16 z-100">
              <div className="space-y-8">
                <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-zinc-50">Find Your Home</h2>
                  <p className="text-lg text-zinc-50 leading-relaxed">
                    Search through our available listings in Pahrump
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-10 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs md:text-sm font-semibold text-foreground">Location</label>
                      <select
                        value={searchFilters.location}
                        onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                        className="px-3 md:px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      >
                        <option value="">All Locations</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Property Type</label>
                      <select
                        value={searchFilters.type}
                        onChange={(e) => setSearchFilters({ ...searchFilters, type: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">All Types</option>
                        {propertyTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Min Bedrooms</label>
                      <input
                        type="number"
                        placeholder="Bedrooms"
                        value={searchFilters.bedrooms}
                        onChange={(e) => setSearchFilters({ ...searchFilters, bedrooms: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Min Bathrooms</label>
                      <input
                        type="number"
                        placeholder="Bathrooms"
                        value={searchFilters.baths}
                        onChange={(e) => setSearchFilters({ ...searchFilters, baths: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Min Price</label>
                      <input
                        type="number"
                        placeholder="Min price"
                        value={searchFilters.minPrice}
                        onChange={(e) => setSearchFilters({ ...searchFilters, minPrice: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Max Price</label>
                      <input
                        type="number"
                        placeholder="Max price"
                        value={searchFilters.maxPrice}
                        onChange={(e) => setSearchFilters({ ...searchFilters, maxPrice: e.target.value })}
                        className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-end w-full md:flex-row gap-3 pt-2">
                    <button
                      onClick={handleSearch}
                      className="flex-1 md:flex-none px-8 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <HiSearch size={18} /> Search Listings
                    </button>
                    <button
                      onClick={() => {
                        setSearchFilters({
                          location: "",
                          type: "",
                          bedrooms: "",
                          baths: "",
                          minPrice: "",
                          maxPrice: "",
                        })
                        setHasSearched(false)
                      }}
                      className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-semibold cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>

                {hasSearched && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
                    <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">Search Results</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {sortedListings.length} {sortedListings.length === 1 ? "listing" : "listings"} found
                          </p>
                        </div>
                        <button
                          onClick={() => setHasSearched(false)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          aria-label="Close results"
                        >
                          <HiX size={24} className="text-foreground" />
                        </button>
                      </div>

                      <div className="p-6">
                        {sortedListings.length > 0 ? (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center mb-6">
                              <p className="text-sm text-muted-foreground font-semibold">Sort by:</p>
                              <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              >
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="bedrooms">Most Bedrooms</option>
                                <option value="newest">Newest</option>
                              </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
                              {sortedListings.map((listing, index) => (
                                <div
                                  key={index}
                                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-border overflow-hidden"
                                >
                                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                                    <div className="text-center">
                                      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wide">
                                        {listing.type}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="p-6 space-y-4">
                                    <div>
                                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                        {listing.location}
                                      </h3>
                                      <p className="text-sm text-muted-foreground">{listing.type}</p>
                                    </div>

                                    <div className="flex gap-6 py-4 border-y border-border">
                                      <div className="flex flex-col items-center">
                                        <p className="text-2xl font-bold text-primary">{listing.bedrooms}</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                          {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                                        </p>
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <p className="text-2xl font-bold text-primary">{listing.baths}</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                          {listing.baths === 1 ? "Bathroom" : "Bathrooms"}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="space-y-3">
                                      <p className="text-3xl font-bold text-primary">
                                        ${listing.price.toLocaleString()}
                                      </p>
                                      <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold">
                                        View Details
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-12">
                            <HiSearch className="mx-auto text-4xl text-muted-foreground mb-4" />
                            <p className="text-lg text-muted-foreground font-semibold">No listings found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search filters</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className={`flex justify-center relative w-full overflow-hidden bg-background transition-all duration-1000 ${visibleSections.has("gallery") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
              <div className="space-y-6 md:space-y-8">
                <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Gallery</h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Explore our beautiful properties and stunning Pahrump homes
                  </p>
                </div>

                <div className="relative px-8 md:px-12">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {carouselData.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                          <div
                            className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                            onClick={() => setExpandedImage(item.src)}
                          >
                            <Image
                              src={item.src || "/placeholder.svg"}
                              alt={`Gallery image ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg
                                  className="w-12 h-12 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-primary text-primary-foreground hover:bg-primary/90" />
                    <CarouselNext className="bg-primary text-primary-foreground hover:bg-primary/90" />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>

        {expandedImage && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setExpandedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={expandedImage || "/placeholder.svg"}
                alt="Expanded gallery image"
                width={1200}
                height={800}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors shadow-lg"
                aria-label="Close expanded image"
              >
                <HiX size={24} className="text-foreground" />
              </button>
            </div>
          </div>
        )}

        <section id="emblems" className="flex justify-center relative w-full overflow-hidden bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-6xl gap-4 py-30 px-4">
            {emblems.map((emblem, index) => (
              <div key={index} className="flex justify-center items-center p-4 rounded-lg bg-white">
                <img alt={emblem.name} src={emblem.image || "/placeholder.svg"} className="max-h-20 object-contain" />
              </div>
            ))}
          </div>
        </section>

        <section
          id="services"
          className={`flex justify-center relative w-full overflow-hidden bg-zinc-100 transition-all duration-1000 ${visibleSections.has("services") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
              <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">Our Services</h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Comprehensive real estate solutions tailored to your needs
                  </p>
                </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${
                      index % 2 === 1 ? "md:grid-flow-dense" : ""
                    }`}
                  >
                    <div className={`flex justify-center ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                      <div className="relative w-full max-w-md h-64 md:h-80 rounded-lg overflow-hidden shadow-lg border-4 border-primary/20 hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div
                      className={`flex flex-col justify-center space-y-4 md:space-y-6 ${
                        index % 2 === 1 ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h3>
                        </div>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <button className="w-fit px-6 md:px-8 py-2 md:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm md:text-base shadow-md hover:shadow-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`flex justify-center relative w-full overflow-hidden bg-background transition-all duration-1000 ${visibleSections.has("contact") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
              <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">Get In Touch</h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
                    possible.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                  <form className="space-y-4 md:space-y-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder:text-muted-foreground"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Message</label>
                      <textarea
                        placeholder="Tell us about your real estate needs..."
                        rows={5}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder:text-muted-foreground resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-base shadow-md hover:shadow-lg"
                    >
                      Send Message
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>
                  </form>

                  <div className="pt-4 md:pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">Prefer to chat?</p>
                    <a
                      href="https://wa.me/12069196886"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-sm shadow-md hover:shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.259-1.02 1.02-1.756 2.117-2.259 3.355-.606 1.605-.949 3.362-.949 5.209 0 2.051.504 4.068 1.41 5.709M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                      </svg>
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-secondary rounded-lg p-6 md:p-8 space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Contact Information</h3>
                      <p className="text-sm md:text-base text-muted-foreground capitalize">
                        Marci Metzger - the ridge realty group
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Address</p>
                          <p className="text-sm md:text-base text-foreground">
                            3190 HW-160, Suite F, Pahrump, Nevada 89048, United States
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Phone</p>
                          <a
                            href="tel:+12069196886"
                            className="text-sm md:text-base text-primary hover:underline font-semibold"
                          >
                            (206) 919-6886
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-6 md:p-8 border-2 border-primary/20 space-y-4">
                    <h3 className="text-lg md:text-xl font-bold text-foreground">Office Hours</h3>
                    <div className="space-y-4">
                      <div className="bg-primary/5 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-sm md:text-base text-foreground font-semibold">Open Daily</p>
                          <p className="text-sm md:text-base text-primary font-semibold">8:00 am – 7:00 pm</p>
                        </div>
                      </div>

                      <p className="text-xs md:text-sm text-muted-foreground italic pt-3 border-t border-border">
                        Appointments outside office hours available upon request. Just call!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="map"
          className={`flex justify-center relative w-full overflow-hidden bg-background transition-all duration-1000 ${visibleSections.has("map") ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 pt-12 pb-6 md:py-16">
              <div className="flex flex-col items-center text-center gap-6 md:gap-8 mb-12 md:mb-16">
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">Visit Us</h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    Find us at our office location in Pahrump
                  </p>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg border-4 border-primary/20 h-96 md:h-[500px]">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6440.545683881431!2d-115.96205900780912!3d36.18424575374449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c6398c31855555%3A0xca2c250302350734!2s3190%20NV-160%20Suite%20F%2C%20Pahrump%2C%20NV%2089048%2C%20USA!5e0!3m2!1sen!2sph!4v1761061661700!5m2!1sen!2sph"
                />
              </div>
            </div>
          </div>
        </section>

        <footer className="flex justify-center relative w-full overflow-hidden bg-foreground text-primary-foreground">
          <div className="flex justify-center w-full">
            <div className="w-full max-w-6xl px-4 md:px-6 py-12 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
                {/* Brand Section */}
                <div className="space-y-4">
                  <div className="flex justify-center md:justify-start">
                    <img
                      src="/images/logo.webp"
                      alt="Marci Metzger Logo"
                      className="h-12 md:h-16 object-contain brightness-0 invert"
                    />
                  </div>
                  <p className="text-sm text-primary-foreground/80 leading-relaxed text-center md:text-start">
                    Your trusted real estate partner in Pahrump, Nevada.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base md:text-lg">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#home"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="#listings"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Listings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#services"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base md:text-lg">Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Residential Sales
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Property Management
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                      >
                        Market Analysis
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-base md:text-lg">Contact</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="text-primary-foreground/80">
                      <p className="font-semibold text-primary-foreground mb-1">Phone</p>
                      <a href="tel:+12069196886" className="hover:text-primary-foreground transition-colors">
                        (206) 919-6886
                      </a>
                    </li>
                    <li className="text-primary-foreground/80">
                      <p className="font-semibold text-primary-foreground mb-1">Address</p>
                      <p>
                        3190 HW-160, Suite F<br />
                        Pahrump, NV 89048
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-primary-foreground/20 pt-8 md:pt-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-primary-foreground/80 text-center md:text-left">
                    © {new Date().getFullYear()} Marci Metzger - The Ridge Realty Group. All rights reserved.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#"
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
