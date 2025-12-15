import { NihilistCookies } from '@/components/chaos/NihilistCookies'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const metadata: Metadata = {
  title: 'Dossiê Não Importa | O Guia da Irrelevância',
  description: 'Um mapa psiquiátrico de milionários com TDAH. O site que o João Vicente não quer que você veja.',
  openGraph: {
    title: '⚠️ CUIDADO: Dossiê Vazado',
    description: 'Contém: Fotos de pés, diagnósticos de rinite e o salário do estagiário.',
    images: ['https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gregório Duvivier dormiu enquanto lia este tweet.',
    description: 'Acesse antes que o processo chegue.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-black text-white selection:bg-[#00ff00] selection:text-black overflow-x-hidden`}>
        {children}
        <NihilistCookies />

        {/* DEVELOPER EASTER EGG */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("%c PARE DE OLHAR O CONSOLE ", "background: red; color: white; font-size: 20px; font-weight: bold; padding: 10px;");
              console.log("%c Se você está aqui, você deveria estar trabalhando. ", "color: #00ff00; font-family: monospace;");
              console.log("Status do Estagiário: Atrasado.");
              console.log("Risco de Processo: 99.9%.");
            `,
          }}
        />
      </body>
    </html>
  );
}
