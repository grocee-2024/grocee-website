import { AtLeastOne } from '../types'

export type ModalStates = Record<
  'burgerMenu' | 'searchBar' | 'confirmModal',
  {
    state: boolean
    onCloseDesktop?: () => void
    onCloseMobile?: () => void
  }
>

type Options = {
  fade?: 'mobile' | 'desktop'
}

class ModalService {
  private modalsStates: ModalStates = {
    burgerMenu: {
      state: false,
    },
    searchBar: {
      state: false,
    },
    confirmModal: {
      state: false,
    },
  }

  clearFade() {
    document.querySelector('.fade-container')?.classList.remove('z-10', 'z-20')
  }

  private handleModalsOpen(options?: Options) {
    const isSomeModalOpen = Object.values(this.modalsStates).some(({ state }) => state === true)

    if (isSomeModalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      document.body.style.paddingRight = `${scrollbarWidth}px`

      document.body.classList.add('cancelScroll')
      document.querySelector('.fade-container')?.classList.add('fade')
    } else {
      document.body.style.paddingRight = '0'
      document.body.classList.remove('cancelScroll')
      document.querySelector('.fade-container')?.classList.remove('fade')
    }

    if (isSomeModalOpen && options?.fade === 'mobile') {
      document.querySelector('.fade-container')?.classList.add('z-20')
    }

    if (isSomeModalOpen && options?.fade === 'desktop') {
      document.querySelector('.fade-container')?.classList.add('z-10')
    }
  }

  changeModalState(name: keyof typeof this.modalsStates, state: boolean, options?: Options) {
    this.modalsStates[name].state = state

    this.handleModalsOpen(options)
  }

  addActionOnScreenChange(
    name: keyof typeof this.modalsStates,
    action: AtLeastOne<ModalStates[keyof ModalStates]>,
  ) {
    this.modalsStates[name] = { ...this.modalsStates[name], ...action }
  }

  getModalStates() {
    return this.modalsStates
  }
}

const modalService = new ModalService()

export default modalService
