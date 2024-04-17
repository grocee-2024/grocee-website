import { AtLeastOne } from '../types'

export type ModalStates = Record<
  'burgerMenu' | 'searchBar' | 'productGallery',
  {
    state: boolean
    onCloseDesktop?: () => void
    onCloseMobile?: () => void
  }
>

class ModalService {
  private modalsStates: ModalStates = {
    burgerMenu: {
      state: false,
    },
    searchBar: {
      state: false,
    },
    productGallery: {
      state: false,
    },
  }

  private handlePageScroll() {
    const isSomeModalOpen = Object.values(this.modalsStates).some(({ state }) => state === true)

    if (isSomeModalOpen) {
      document.body.classList.add('cancelScroll')
    } else {
      document.body.classList.remove('cancelScroll')
    }
  }

  changeModalState(name: keyof typeof this.modalsStates, state: boolean) {
    this.modalsStates[name].state = state

    this.handlePageScroll()
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
