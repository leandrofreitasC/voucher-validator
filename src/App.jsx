import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { CheckCircle, XCircle, Trash2, Receipt } from 'lucide-react'
import { toast } from 'sonner'
import './App.css'

// Lista mockada de CNPJs participantes da promoção
const CNPJS_PARTICIPANTES = [
  '11.222.333/0001-81',
  '12.345.678/0001-95',
  '98.765.432/0001-10',
  '55.444.333/0001-22',
  '77.888.999/0001-33'
]

function App() {
  const [cnpj, setCnpj] = useState('')
  const [voucher, setVoucher] = useState('')
  const [cnpjValidado, setCnpjValidado] = useState(false)
  const [cnpjAtual, setCnpjAtual] = useState('')
  const [contadorVouchers, setContadorVouchers] = useState(0)
  const [vouchersUsados, setVouchersUsados] = useState([])

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const vouchersArmazenados = JSON.parse(localStorage.getItem('vouchersUsados') || '[]')
    const contador = parseInt(localStorage.getItem('contadorVouchers') || '0')
    setVouchersUsados(vouchersArmazenados)
    setContadorVouchers(contador)
  }, [])

  // Função para validar formato do CNPJ
  const validarFormatoCNPJ = (cnpj) => {
    // Remove caracteres não numéricos
    const cnpjLimpo = cnpj.replace(/\D/g, '')
    
    // Verifica se tem 14 dígitos
    if (cnpjLimpo.length !== 14) return false
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpjLimpo)) return false
    
    return true
  }

  // Função para formatar CNPJ
  const formatarCNPJ = (valor) => {
    const cnpjLimpo = valor.replace(/\D/g, '')
    if (cnpjLimpo.length !== 14) return valor
    return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }

  // Função para validar participação do CNPJ
  const validarParticipacao = () => {
    const cnpjFormatado = formatarCNPJ(cnpj)
    
    if (!validarFormatoCNPJ(cnpj)) {
      toast.error('CNPJ inválido. Verifique o formato.')
      return
    }
    
    // Verifica se o CNPJ está na lista de participantes
    const cnpjParticipante = CNPJS_PARTICIPANTES.find(c => c === cnpjFormatado)
    
    if (cnpjParticipante) {
      setCnpjValidado(true)
      setCnpjAtual(cnpjFormatado)
      toast.success('CNPJ válido! Agora você pode validar seu voucher.')
    } else {
      toast.error('CNPJ não participante da promoção.')
    }
  }

  // Função para validar voucher
  const validarVoucher = () => {
    if (voucher.length !== 6) {
      toast.error('Voucher deve ter exatamente 6 caracteres.')
      return
    }
    
    // Verificar se voucher já foi usado
    const voucherJaUsado = vouchersUsados.find(v => v.codigo === voucher.toUpperCase())
    
    if (voucherJaUsado) {
      toast.error('Voucher já foi usado.')
      return
    }
    
    // Salvar voucher no localStorage
    const novoVoucher = {
      codigo: voucher.toUpperCase(),
      cnpj: cnpjAtual,
      dataUso: new Date().toISOString()
    }
    
    const novosVouchersUsados = [...vouchersUsados, novoVoucher]
    const novoContador = contadorVouchers + 1
    
    localStorage.setItem('vouchersUsados', JSON.stringify(novosVouchersUsados))
    localStorage.setItem('contadorVouchers', novoContador.toString())
    
    setVouchersUsados(novosVouchersUsados)
    setContadorVouchers(novoContador)
    setVoucher('')
    toast.success('Voucher cadastrado com sucesso!')
  }

  // Função para limpar histórico
  const limparHistorico = () => {
    localStorage.removeItem('vouchersUsados')
    localStorage.removeItem('contadorVouchers')
    setVouchersUsados([])
    setContadorVouchers(0)
    toast.success('Histórico limpo com sucesso!')
  }

  // Função para resetar validação
  const resetarValidacao = () => {
    setCnpjValidado(false)
    setCnpjAtual('')
    setCnpj('')
    setVoucher('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Receipt className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Validador de Vouchers</h1>
          </div>
          <p className="text-gray-600">Promoção Especial de Hambúrguer</p>
        </div>

        {/* Card de Validação CNPJ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">1</span>
              Validação de Participação
            </CardTitle>
            <CardDescription>
              Digite o CNPJ da empresa para verificar se está participando da promoção
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cnpj" className="text-sm font-medium">CNPJ</label>
              <Input
                id="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                disabled={cnpjValidado}
                maxLength={18}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={validarParticipacao}
                disabled={!cnpj || cnpjValidado}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Validar Participação
              </Button>
              {cnpjValidado && (
                <Button 
                  onClick={resetarValidacao}
                  variant="outline"
                >
                  Novo CNPJ
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card de Validação Voucher */}
        {cnpjValidado && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">2</span>
                Validação de Voucher
              </CardTitle>
              <CardDescription>
                Digite o código do voucher (6 caracteres)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="voucher" className="text-sm font-medium">Código do Voucher</label>
                <Input
                  id="voucher"
                  type="text"
                  placeholder="ABC123"
                  value={voucher}
                  onChange={(e) => setVoucher(e.target.value.toUpperCase())}
                  maxLength={6}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={validarVoucher}
                  disabled={!voucher || voucher.length !== 6}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Validar Voucher
                </Button>
                <Button 
                  onClick={limparHistorico}
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Histórico de Vouchers */}
        {vouchersUsados.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Vouchers</CardTitle>
              <CardDescription>
                Total de vouchers utilizados: {contadorVouchers}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vouchersUsados.map((v, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{v.codigo}</Badge>
                      <span className="text-sm text-gray-600">{v.cnpj}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(v.dataUso).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CNPJs Participantes (para teste) */}
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-sm">CNPJs Participantes (para teste)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm font-mono">
              {CNPJS_PARTICIPANTES.map((cnpj, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded text-center">
                  {cnpj}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

