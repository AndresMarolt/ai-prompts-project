"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Nav = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [dropdownVisible, isDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const obtainProviders = async () => {
        const response = await getProviders();
        setProviders(response);
    }
    obtainProviders();

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          isDropdownVisible(false);
        }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
    document.removeEventListener('click', handleClickOutside);
    };
  }, [])

  const onClickLink = () => {
    router.push()
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='flex gap-2 flex-center'>
            <Image 
                src="/assets/images/logo.svg"
                alt='Promptopia Logo'
                width={30}
                height={30}
                className='object-contain'
            />

            <p className='logo_text'>Promptopia</p>
        </Link>

        {/* DESKTOP NAV */}
        <div className='sm:flex hidden'>
            { session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href="/create-prompt" className='black_btn'> 
                        Create Post
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href={`/profile/${session?.user.id}`}>
                        <Image
                            src={ session?.user.image }
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='profile'
                        />
                    </Link>
                </div>
            ) : (
                <>
                    { providers && 
                        Object.values(providers).map((provider) => (
                            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}
        </div>

        {/* MOBILE NAV */}
        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex' ref={dropdownRef}>
                    <Image
                        src={ session?.user.image }
                        width={37}
                        height={37}
                        className='rounded-full cursor-pointer'
                        alt='profile'
                        onClick={() => isDropdownVisible((prev) => !prev)}
                    />

                    { dropdownVisible && (
                        <div className='dropdown'>
                            <Link href={`/profile/${session?.user.id}`} className='dropdown_link w-full text-center' onClick={() => isDropdownVisible(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-prompt" className='dropdown_link w-full text-center' onClick={() => isDropdownVisible(false)}>
                                Create Prompt
                            </Link>
                            <button type='button' onClick={() => { isDropdownVisible(false); signOut(); } } className='w-full black_btn signout_btn' >
                                Sign Out
                            </button>
                        </div>
                    ) }
                </div>
            ) : (
                <>
                    { providers && 
                        Object.values(providers).map((provider) => (
                            <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                Sign In
                            </button>
                        ))
                    }
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav